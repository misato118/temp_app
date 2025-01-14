import { FormEvent } from 'react'
 
export default function RentalApplicationForm() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/submitRentForm', {
      method: 'POST',
      body: formData,
    });
 
    const data = await response.json()
    // TODO: Deal with the returned data
  }
 
  return (
    <form onSubmit={onSubmit}>
        <p>Rental Application Form</p>
        <input type="number" name="fee" />
        <input type="number" name="duration" />
        <button type="submit">Submit</button>
    </form>
  )
}