import Logo from "./image/logo.png";

function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer>
      <div className="flex flex-col-reverse md:flex-row md:justify-around items-center mt-10 h-18">
        <img src={Logo} alt="logo" className="w-36 h-36 invisible md:visible" />
        <p className="gradient invisible md:visible">
          Copyright &copy; {footerYear} All rights reserved
        </p>
        <div className="flex justify-center border-t-2 border-darkenGreen w-full md:w-0 md:border-0">
          <i className="fa-brands fa-facebook fa-2xl hover:scale-125 icon mt-4 md:mt-0"></i>
          <i className="fa-brands fa-instagram fa-2xl hover:scale-125  icon mt-4 md:mt-0"></i>
          <i className="fa-brands fa-x-twitter fa-2xl hover:scale-125  icon mt-4 md:mt-0"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
