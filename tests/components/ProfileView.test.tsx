import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { ProfileView } from '@/components/dashboard/views/ProfileView'

describe('ProfileView', () => {
  it('loads and displays user profile data', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 'user_1',
        name: 'Test User',
        username: 'testuser',
        image: null,
        karma: 123,
        _count: {
          transactionsSent: 2,
          transactionsReceived: 3,
        },
      }),
    } as Response)

    render(<ProfileView />)

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test User')).toBeInTheDocument()
    })

    expect(screen.getByText('testuser')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
    expect(screen.getByText('Karma Activity (GitKarma)')).toBeInTheDocument()
  })

  it('submits updated profile', async () => {
    const fetchMock = vi
      .spyOn(global, 'fetch')
      // initial GET
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'user_1',
          name: 'Old Name',
          username: 'olduser',
          image: null,
          karma: 10,
          _count: {
            transactionsSent: 0,
            transactionsReceived: 0,
          },
        }),
      } as Response)
      // PATCH
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'user_1',
          name: 'New Name',
          username: 'newuser',
          image: null,
          karma: 10,
          _count: {
            transactionsSent: 0,
            transactionsReceived: 0,
          },
        }),
      } as Response)

    render(<ProfileView />)

    const nameInput = await screen.findByDisplayValue('Old Name')
    fireEvent.change(nameInput, { target: { value: 'New Name' } })

    const saveButton = screen.getByRole('button', { name: /save profile/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2)
    })
  })
})
