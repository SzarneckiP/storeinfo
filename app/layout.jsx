import '../styles/global.css'
import { Nav, Provider } from '../components'

export const metadata = {
    title: 'StoreInfo | Zostaw informacje ze zmiany.',
    description: 'StoreInfo - Coś się wydarzyło? Masz coś do przekazania dla współpracowników? Zostaw informacje ze zmiany.',
}

const RootLayout = ({ children }) => {

    return (
        <html lang='en'>
            <head>
                <link rel="shortcut icon" type='image/svg' href="assets/icons/warehouse.png" />
            </head>
            <Provider>
                <body>

                    <div className='main'>
                        <div className='gradient' />
                    </div>
                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </body>
            </Provider>
        </html>
    )
}

export default RootLayout