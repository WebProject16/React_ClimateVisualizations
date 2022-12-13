import React from 'react';

export default function Footer() {
    return (
        <div className='main-footer'>
            <div className='container-fluid'>
                <footer className="position-relative d-flex flex-items-center pb-2 f6 color-fg-muted border-top color-border-muted flex-column-reverse flex-lg-row flex-wrap flex-lg-nowrap mt-6 pt-6">
                    <div className="text-center p-3">
                    © 2022 Tekijät:&#8194;
                        <a className="text-dark" href="https://github.com/WebProject16/React_ClimateVisualizations">Helmi Laakkonen, Pinja Kemppainen, Lasse Suomela ja Miko Prykäri </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}