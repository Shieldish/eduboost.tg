/**
 * tests/components.test.tsx - Tests des composants UI
 *
 * Couvre :
 *   - PaymentMethodSelector : sélection MIXX / CREDIT_YAS
 *   - PhoneInput            : validation numéros Togo
 *   - QuantityInput         : compteur +/-
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


// ─────────────────────────────────────────────────────────────────────────────
// PaymentMethodSelector
// ─────────────────────────────────────────────────────────────────────────────

describe('PaymentMethodSelector', () => {
  // Import dynamique pour éviter les soucis de "use client" en test
  const renderSelector = async (value: string | null, onChange = vi.fn()) => {
    const { default: PaymentMethodSelector } =
      await import('../app/components/ticket/PaymentMethodSelector')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return render(<PaymentMethodSelector value={value as any} onChange={onChange} />)
  }

  it('affiche les 2 méthodes de paiement', async () => {
    await renderSelector(null)
    expect(screen.getByText('Mobile money')).toBeTruthy()
    expect(screen.getByText('Airtime / Crédit')).toBeTruthy()
  })

  it('appelle onChange avec MIXX quand on clique MIXX', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    await renderSelector(null, onChange)
    const mixxBtn = screen.getAllByRole('radio')[0]
    await user.click(mixxBtn)
    expect(onChange).toHaveBeenCalledWith('MIXX')
  })

  it('appelle onChange avec CREDIT_YAS quand on clique Airtime', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    await renderSelector(null, onChange)
    const creditBtn = screen.getAllByRole('radio')[1]
    await user.click(creditBtn)
    expect(onChange).toHaveBeenCalledWith('CREDIT_YAS')
  })

  it('marque MIXX comme sélectionné quand value=MIXX', async () => {
    await renderSelector('MIXX')
    const mixxBtn = screen.getAllByRole('radio')[0]
    expect(mixxBtn).toHaveAttribute('aria-checked', 'true')
  })

  it('ne marque rien quand value=null', async () => {
    await renderSelector(null)
    const radios = screen.getAllByRole('radio')
    radios.forEach(r => expect(r).toHaveAttribute('aria-checked', 'false'))
  })

  it('ne propose pas Flooz (retiré du projet)', async () => {
    await renderSelector(null)
    expect(screen.queryByText(/flooz/i)).toBeNull()
    expect(screen.queryByText(/moov/i)).toBeNull()
  })
})


// ─────────────────────────────────────────────────────────────────────────────
// PhoneInput
// ─────────────────────────────────────────────────────────────────────────────

describe('PhoneInput', () => {
  const renderPhone = async (value = '', error = '', onChange = vi.fn()) => {
    const { default: PhoneInput } =
      await import('../app/components/ticket/PhoneInput')
    return render(
      <PhoneInput id="phone-test" value={value} error={error} onChange={onChange} />
    )
  }

  it('affiche le drapeau Togo et +228', async () => {
    await renderPhone()
    expect(screen.getByText('+228')).toBeTruthy()
    // L'image du drapeau
    const img = screen.getByAltText('Togo')
    expect(img).toBeTruthy()
  })

  it('appelle onChange avec uniquement les chiffres', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    await renderPhone('', '', onChange)
    const input = screen.getByRole('textbox')
    await user.type(input, '90abc123456')
    // Doit filtrer les lettres
    expect(onChange).toHaveBeenLastCalledWith(expect.stringMatching(/^\d+$/))
  })

  it('limite à 8 caractères', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    await renderPhone('', '', onChange)
    const input = screen.getByRole('textbox')
    await user.type(input, '9012345678901')
    const lastCall = onChange.mock.calls.at(-1)?.[0]
    expect(lastCall?.length).toBeLessThanOrEqual(8)
  })

  it('affiche le message d\'erreur', async () => {
    await renderPhone('', 'Numéro invalide')
    expect(screen.getByText('Numéro invalide')).toBeTruthy()
  })

  it('n\'affiche pas d\'erreur quand error est vide', async () => {
    await renderPhone('90123456', '')
    expect(screen.queryByRole('alert')).toBeNull()
  })
})


// ─────────────────────────────────────────────────────────────────────────────
// QuantityInput
// ─────────────────────────────────────────────────────────────────────────────

describe('QuantityInput', () => {
  const renderQty = async (value = 1, onChange = vi.fn()) => {
    const { default: QuantityInput } =
      await import('../app/components/ticket/QuantityInput')
    return render(<QuantityInput id="qty-test" value={value} onChange={onChange} />)
  }

  it('affiche la valeur actuelle', async () => {
    await renderQty(3)
    const input = screen.getByRole('spinbutton')
    expect(input).toHaveValue(3)
  })

  it('bouton + appelle onChange avec value+1', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    await renderQty(5, onChange)
    const plusBtn = screen.getByLabelText('Augmenter la quantité')
    await user.click(plusBtn)
    expect(onChange).toHaveBeenCalledWith(6)
  })

  it('bouton - appelle onChange avec value-1', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    await renderQty(5, onChange)
    const minusBtn = screen.getByLabelText('Réduire la quantité')
    await user.click(minusBtn)
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('ne descend pas en dessous de 1', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    await renderQty(1, onChange)
    const minusBtn = screen.getByLabelText('Réduire la quantité')
    await user.click(minusBtn)
    expect(onChange).toHaveBeenCalledWith(1)  // reste à 1
  })

  it('ne monte pas au-dessus de 100', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    await renderQty(100, onChange)
    const plusBtn = screen.getByLabelText('Augmenter la quantité')
    await user.click(plusBtn)
    expect(onChange).toHaveBeenCalledWith(100)  // reste à 100
  })
})
