import '../styles/global.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp