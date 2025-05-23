import React from 'react'
import { Link } from 'react-router-dom'
import logo from '/img/logo.png'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand"><img src={ logo} alt='ریداکس وبلاگ' width='80px' height='80px'/>   وبلاک تستی با ریداکس</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">صفحه اصلی</Link>
            </li>
            <li className="nav-item">
              <Link to={"/users"} className="nav-link" href="#">نویسندگان</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                فرهنگی و هنری
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">نقاشی</a></li>
                <li><a className="dropdown-item" href="#">تاریخی</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">سایر موارد</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="نام مقاله..." aria-label="Search" />
            <button className="btn btn-outline-primary" type="submit">جستجو</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
