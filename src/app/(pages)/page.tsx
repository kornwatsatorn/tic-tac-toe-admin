"use client"

import { useLoading } from "@/context/LoadingContext"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useTranslation } from "react-i18next"
import { Container } from "react-bootstrap"

const HomePage = () => {
  // import
  const { setLoading } = useLoading()
  const { data: session, update } = useSession()
  const { t } = useTranslation()
  // variable

  // utile
  const init = async () => {
    try {
      setLoading(true)
    } catch (error) {
      console.log(
        "%csrc/app/(pages)/page.tsx:59 error",
        "color: #007acc;",
        error
      )
    } finally {
      setLoading(false)
    }
  }

  // init
  useEffect(() => {
    init()
  }, [])

  // render
  return (
    <div className="content">
      <Container className="content-panel d-flex flex-column h-100 gap-3">
        Welcome to Dashboard
      </Container>
    </div>
  )
}

export default HomePage
