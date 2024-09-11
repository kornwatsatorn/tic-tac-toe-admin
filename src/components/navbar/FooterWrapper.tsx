"use client"

import { Button, Col, Row } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import ImageWrapper from "@/components/utils/ImageWrapper"
import { defaultImage } from "@/utils/default"
import { useLoading } from "@/context/LoadingContext"

const FooterWrapper = () => {
  // import
  const { t } = useTranslation()
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { setLoading } = useLoading()

  // render
  return (
    <div className="sticky-bottom bg-white">
      <Container>
        <Row id="footer-bottom" className="align-items-center">
          <Col xs={12} className="text-center">
            Kornwatsatorn. All right reserved.
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FooterWrapper
