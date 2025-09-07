import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <header className='py-3 my-5' style={{backgroundColor:"#6050DC"}}>
        <div className='conatiner px-4 px-lg-5 my-5'>
            <div className='text-center text-white'>
                <h1 className='display-4 fw-bold'>Page Not Found!!!!!...Sorry</h1>
                <p className='lead fw-normal text-white-75 mb-4'>This page is not working please try later</p>
                <Link to="/" className='btn btn-light btn-lg rounded-pill px-4 py-2'>Back Home</Link>
            </div>
        </div>
    </header>
  )
}

export default NotFoundPage