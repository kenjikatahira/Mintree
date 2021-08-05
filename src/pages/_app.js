import '../styles/global.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import theme from '../theme'

const custom = extendTheme({
    colors : {
        brand : theme
    }
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={custom}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp