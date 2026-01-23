'use client'

import Link from 'next/link'
import { CompanyInfo } from '@/data/properties'

export default function About() {
  const company = CompanyInfo[0]

  return (
    <div className="bg-light min-vh-100">
      {/* Breadcrumb */}
      <div className="bg-white border-bottom py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link href="/" className="text-decoration-none">Home</Link></li>
              <li className="breadcrumb-item active">About Us</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-3 fw-bold mb-3">About {company.companyName}</h1>
              <p className="lead mb-0">Transforming real estate with trust, expertise, and innovation since our founding.</p>
            </div>
            <div className="col-lg-4 text-center">
              <div className="display-1" style={{ opacity: 0.3 }}>🏢</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5 mb-5">
            {/* Mission */}
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
                <div className="bg-primary bg-opacity-10 p-4">
                  <div className="h1 mb-3">🎯</div>
                  <h3 className="fw-bold text-dark mb-3">Our Mission</h3>
                  <p className="text-muted mb-0">{company.decs}</p>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-0">We believe that finding the right property shouldn't be complicated. Our mission is to simplify the real estate experience by providing transparent information, expert guidance, and personalized service to every client.</p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
                <div className="bg-success bg-opacity-10 p-4">
                  <div className="h1 mb-3">🌟</div>
                  <h3 className="fw-bold text-dark mb-3">Our Vision</h3>
                  <p className="text-muted mb-0">To be the most trusted and innovative real estate platform in the tri-state area.</p>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-0">We envision a future where technology and human expertise work together seamlessly to create exceptional real estate experiences for buyers, sellers, and renters.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">Our Core Values</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <div className="h1 mb-3">🤝</div>
                <h5 className="fw-bold text-dark mb-2">Integrity</h5>
                <p className="text-muted small">Honest dealings and transparency in every transaction</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <div className="h1 mb-3">📈</div>
                <h5 className="fw-bold text-dark mb-2">Excellence</h5>
                <p className="text-muted small">Striving for the highest standards in service</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <div className="h1 mb-3">🚀</div>
                <h5 className="fw-bold text-dark mb-2">Innovation</h5>
                <p className="text-muted small">Leveraging technology for better solutions</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <div className="h1 mb-3">❤️</div>
                <h5 className="fw-bold text-dark mb-2">Community</h5>
                <p className="text-muted small">Building relationships that last lifetimes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">Why Choose {company.companyName}?</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="d-flex gap-4">
                <div>
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.5rem', flexShrink: 0 }}>✓</div>
                </div>
                <div>
                  <h5 className="fw-bold text-dark mb-2">Expert Team</h5>
                  <p className="text-muted">20+ years of combined experience in real estate market across New York</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex gap-4">
                <div>
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.5rem', flexShrink: 0 }}>✓</div>
                </div>
                <div>
                  <h5 className="fw-bold text-dark mb-2">Extensive Listings</h5>
                  <p className="text-muted">Access to thousands of properties across all neighborhoods in NYC</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex gap-4">
                <div>
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.5rem', flexShrink: 0 }}>✓</div>
                </div>
                <div>
                  <h5 className="fw-bold text-dark mb-2">24/7 Support</h5>
                  <p className="text-muted">Available round the clock to assist you with any questions or concerns</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex gap-4">
                <div>
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.5rem', flexShrink: 0 }}>✓</div>
                </div>
                <div>
                  <h5 className="fw-bold text-dark mb-2">Technology First</h5>
                  <p className="text-muted">Using cutting-edge tools and platforms for seamless experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="bg-light rounded-3 p-4">
                <div className="h2 fw-bold text-primary mb-2">20+</div>
                <small className="text-muted">Years of Experience</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-light rounded-3 p-4">
                <div className="h2 fw-bold text-success mb-2">5000+</div>
                <small className="text-muted">Happy Clients</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-light rounded-3 p-4">
                <div className="h2 fw-bold text-warning mb-2">$2.5B+</div>
                <small className="text-muted">Properties Sold</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-light rounded-3 p-4">
                <div className="h2 fw-bold text-info mb-2">50+</div>
                <small className="text-muted">Team Members</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container text-center">
          <h3 className="fw-bold mb-3">Get In Touch</h3>
          <p className="lead text-white-50 mb-4">Have questions? We'd love to hear from you!</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <a href={`mailto:${company.comanyEmail}`} className="btn btn-primary btn-lg rounded-pill fw-bold">📧 Email Us</a>
            <a href={company.whatsApp} className="btn btn-success btn-lg rounded-pill fw-bold" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
            <Link href="/" className="btn btn-outline-light btn-lg rounded-pill fw-bold">Browse Properties</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
