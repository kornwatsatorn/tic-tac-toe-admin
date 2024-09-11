"use client"

import { Button, Col, Offcanvas, Row } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import ImageWrapper from "@/components/utils/ImageWrapper"
import SwitchLanguage from "@/components/utils/SwitchLanguageWrapper"
import Link from "next/link"
import { defaultImage } from "@/utils/default"
import { useLoading } from "@/context/LoadingContext"

const NavbarWrapper = () => {
  // import
  const { t } = useTranslation()
  const { setLoading } = useLoading()
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
  const { data: session } = useSession()
  const router = useRouter()

  // variable

  // methods
  const onclickSignOut = async () => {
    setLoading(true)
    await signOut({ callbackUrl: "/login" })
  }

  // render
  return (
    <Navbar bg="light" expand="md" className="sticky-top" id="navbar-top">
      <Container fluid>
        <Navbar.Brand href="#home">
          <div style={{ width: "50px", height: "50px" }}>
            <Link href={"/"}>
              <ImageWrapper
                src={"/logo.png"}
                alt={"logo"}
                objectFit="contain"
              />
            </Link>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="offcanvas-navbar"
          onClick={() => setIsShowMenu(true)}
        />
        <Navbar.Offcanvas
          id="offcanvas-navbar"
          aria-labelledby="offcanvas-navbar-label"
          placement="start"
          show={isShowMenu}
          onHide={() => setIsShowMenu(false)}
          style={{ flex: 0 }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvas-navbar-label">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              {session && (
                <>
                  <Nav.Link href="/user">User</Nav.Link>
                  <Nav.Link href="/match">Match</Nav.Link>
                </>
              )}
              {/* <SwitchLanguage /> */}
              {session && (
                <div>
                  <Button
                    variant="danger"
                    onClick={onclickSignOut}
                    style={{ width: "fit-content", whiteSpace: "nowrap" }}
                  >
                    {t("button.logout")}
                  </Button>
                </div>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default NavbarWrapper
