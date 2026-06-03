/**
 * tests/hooks.test.ts — Tests des hooks React
 *
 * Couvre :
 *   - isValidTogoPhone   : validation numéros
 *   - confirmation-store : localStorage TTL
 *   - useOtpAuth         : machine à états OTP
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'


// ─────────────────────────────────────────────────────────────────────────────
// config/index.ts — isValidTogoPhone
// ─────────────────────────────────────────────────────────────────────────────

describe('isValidTogoPhone', () => {
  let isValid: (p: string) => boolean

  beforeEach(async () => {
    const mod = await import('../config/index')
    isValid = mod.isValidTogoPhone
  })

  it.each([
    '70000000', '71000000', '72000000', '73000000',
    '78000000', '79000000', '90000000', '91000000',
    '92000000', '93000000', '96000000', '97000000',
    '98000000', '99000000',
  ])('accepte le préfixe valide : %s', (phone) => {
    expect(isValid(phone)).toBe(true)
  })

  it.each([
    ['80000000', 'préfixe 80 invalide'],
    ['50000000', 'préfixe 50 invalide'],
    ['9012345',  'trop court (7 chiffres)'],
    ['901234567','trop long (9 chiffres)'],
    ['',         'vide'],
    ['abcdefgh', 'lettres'],
  ])('rejette %s (%s)', (phone) => {
    expect(isValid(phone)).toBe(false)
  })
})


// ─────────────────────────────────────────────────────────────────────────────
// lib/confirmation-store.ts
// ─────────────────────────────────────────────────────────────────────────────

describe('confirmation-store', () => {
  const SAMPLE = {
    ref:   'EDB-2026-TEST',
    codes: ['99000001', '99000002'],
    qty:   2,
    total: 500,
    phone: '90123456',
  }

  it('sauvegarde et relit les données', async () => {
    const { saveConfirmation, readConfirmation } =
      await import('../lib/confirmation-store')
    saveConfirmation(SAMPLE)
    const data = readConfirmation()
    expect(data).toMatchObject(SAMPLE)
  })

  it('retourne null si rien n\'est sauvegardé', async () => {
    const { readConfirmation } = await import('../lib/confirmation-store')
    expect(readConfirmation()).toBeNull()
  })

  it('retourne null après clearConfirmation', async () => {
    const { saveConfirmation, readConfirmation, clearConfirmation } =
      await import('../lib/confirmation-store')
    saveConfirmation(SAMPLE)
    clearConfirmation()
    expect(readConfirmation()).toBeNull()
  })

  it('retourne null si les données sont expirées', async () => {
    // Simuler une expiration en injectant manuellement une entrée expirée
    const expired = JSON.stringify({ ...SAMPLE, expiresAt: Date.now() - 1000 })
    localStorage.setItem('gte_confirmation', expired)
    const { readConfirmation } = await import('../lib/confirmation-store')
    expect(readConfirmation()).toBeNull()
  })

  it('retourne null si les données sont corrompues', async () => {
    localStorage.setItem('gte_confirmation', 'INVALID_JSON{{{')
    const { readConfirmation } = await import('../lib/confirmation-store')
    expect(readConfirmation()).toBeNull()
  })
})


// ─────────────────────────────────────────────────────────────────────────────
// hooks/useOtpAuth.ts
// ─────────────────────────────────────────────────────────────────────────────

describe('useOtpAuth', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('démarre à l\'étape PHONE', async () => {
    const { useOtpAuth } = await import('../hooks/useOtpAuth')
    const { result } = renderHook(() => useOtpAuth())
    expect(result.current.step).toBe('PHONE')
  })

  it('passe à OTP après requestOtp réussi', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok:   true,
      json: () => Promise.resolve({ status: 'sent', dev_otp: '1234' }),
    })

    const { useOtpAuth } = await import('../hooks/useOtpAuth')
    const { result } = renderHook(() => useOtpAuth())

    await act(async () => { result.current.setPhone('90123456') })
    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent
    await act(async () => { await result.current.requestOtp(fakeEvent) })

    expect(result.current.step).toBe('OTP')
    expect(result.current.devOtp).toBe('1234')
  })

  it('affiche une erreur si requestOtp échoue', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok:   false,
      json: () => Promise.resolve({ error: 'Serveur indisponible' }),
    })

    const { useOtpAuth } = await import('../hooks/useOtpAuth')
    const { result } = renderHook(() => useOtpAuth())

    await act(async () => { result.current.setPhone('90123456') })
    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent
    await act(async () => { await result.current.requestOtp(fakeEvent) })

    expect(result.current.step).toBe('PHONE')  // reste à PHONE
    expect(result.current.error).toBeTruthy()
  })

  it('passe à TICKETS après verifyOtp réussi', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ status: 'sent' }) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({
        phone: '90123456', total: 2, orders: [],
      })})

    const { useOtpAuth } = await import('../hooks/useOtpAuth')
    const { result } = renderHook(() => useOtpAuth())
    const ev = { preventDefault: vi.fn() } as unknown as React.FormEvent

    await act(async () => { result.current.setPhone('90123456') })
    await act(async () => { await result.current.requestOtp(ev) })
    await act(async () => { result.current.setOtp('1234') })
    await act(async () => { await result.current.verifyOtp(ev) })

    expect(result.current.step).toBe('TICKETS')
  })

  it('reset revient à l\'étape PHONE', async () => {
    const { useOtpAuth } = await import('../hooks/useOtpAuth')
    const { result } = renderHook(() => useOtpAuth())

    await act(async () => {
      result.current.setPhone('90123456')
      result.current.setOtp('1234')
    })
    await act(async () => { result.current.reset() })

    expect(result.current.step).toBe('PHONE')
    expect(result.current.phone).toBe('')
    expect(result.current.otp).toBe('')
  })
})
