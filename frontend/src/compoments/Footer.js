import React from 'react';
import './../style/Comman css/footer.css';

function Footer() {
    return (
        <div className='footer'>
                <div className='sb_footer-below'>
                    <div className='sb_footer-copyright'>
                        <p>
                            @{new Date().getFullYear()} RuchiPackaing.lk. All right reservered.
                        </p>
                    </div>
                    <hr></hr>
                    <div className='FooterLinks'>
                        <a href="/terms"><div className=''><p>Terms & Conditions</p></div></a>
                        <a href="/terms"><div className=''><p>Privacy</p></div></a>
                        <a href="/terms"><div className=''><p>Security</p></div></a>
                        <a href="/terms"><div className=''><p>Cooke Declaration</p></div></a>

                    </div>
                </div>
        </div>
    );
}

export default Footer;
