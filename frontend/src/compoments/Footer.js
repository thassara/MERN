import React from 'react';
import './../style/Comman css/footer.css';
// import fb from '..';
// import twitter from '..';
// import linkedin from '..';
// import Instagram from '..';

function Footer() {
    return (
        <div className='footer'>
            <div className='sb_footer section_padding'>
                
                <div className='sb_footer-below'>
                    <div className='sb_footer-copyright'>
                        <p>
                            @{new Date().getFullYear()} TeamPisso. All right reserver.
                        </p>
                    </div>
                    <hr></hr>
                    <div className='sb_footer-below-links'>
                        <a href="/terms"><div className=''><p>Terms & Conditions</p></div></a>
                        <a href="/terms"><div className=''><p>Privacy</p></div></a>
                        <a href="/terms"><div className=''><p>Security</p></div></a>
                        <a href="/terms"><div className=''><p>Cooke Declaration</p></div></a>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
