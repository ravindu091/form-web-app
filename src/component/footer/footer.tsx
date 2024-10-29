import './foo.css';

function Footer() {
  return (
    <div className="footer" style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '20px' }}>
      <p>
        Made with ❤️ by{' '}
        <a
          href="https://www.google.com/search?q=ravindu+dilupa+gunasekara" // Replace with your actual link
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#4aa3df', textDecoration: 'none' }}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          Ravindu Dilupa Gunasekara
        </a>
      </p>
      <a
        href="https://lk.linkedin.com/in/ravindu-dilupa-522692233" // Replace with your LinkedIn profile link
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', color: '#0077b5', textDecoration: 'none', marginTop: '10px' }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f8/LinkedIn_icon_circle.svg"
          alt="LinkedIn"
          style={{ width: '24px', height: '24px', marginRight: '8px' }}
        />
        Connect on LinkedIn
      </a>
    </div>
  );
}

export default Footer;
