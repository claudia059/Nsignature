import { CompanyInfo } from "@/data/properties";

export default function Footer() {
  return (
    <footer className="footer text-white mt-5 py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">🏠 NorCal</h5>
            <p className=" small">
              Find your perfect home with our comprehensive real estate marketplace.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="/browse" className=" text-decoration-none">Browse Properties</a></li>
              <li><a href="/" className=" text-decoration-none">Search</a></li>
              <li><a href="/about" className=" text-decoration-none">About</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Contact</h6>
            <p className=" small">
              Email: {CompanyInfo[0].comanyEmail}<br />
              Phone: VIP
            </p>
          </div>
        </div>
        <hr className="bg-secondary" />
        <div className="text-center  small">
          <p>&copy; 2026 {CompanyInfo[0].companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
