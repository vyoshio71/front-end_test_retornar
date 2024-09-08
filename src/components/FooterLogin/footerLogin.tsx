import "../../css/components/footerLogin.css";

/**
 * Footer Login Component.
 */

const FooterLogin = () => {
  return (
    <footer className="footerLogin">
      <p>
        <span>{new Date().getFullYear()}</span>
        <b>©</b>
        <span>Victor Yoshio</span>
      </p>
    </footer>
  );
};

export default FooterLogin;
