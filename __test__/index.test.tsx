import { render, screen } from '@testing-library/react'
import Banner from "@/app/Banner"
import { Footer } from '@/app/Footer';



describe("footer page", ()=>{

  it("should render properly", ()=>{
    render(<Footer/>);
    const header = screen.getByRole('heading')
    const headerText = 'washington'

    expect(header).toHaveTextContent(headerText)
  })

})
