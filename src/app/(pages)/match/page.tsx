"use client"

import { useLoading } from "@/context/LoadingContext"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap"
import fetchApi from "@/utils/axios"
import { IPaginate } from "@/types/paginate"
import { defaultPaginate } from "@/utils/default"
import dayjs from "dayjs"
import ReactPaginate from "react-paginate"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IMatchSchema, MatchSchema } from "./match.zod"
import { EMatchType, EQueueStatus } from "@/utils/enum"

const keyTable = [
  "#",
  "type",
  "player1",
  "player2",
  "winner",
  "point",
  "status",
  "createdAt",
  "updatedAt",
] as const
type KeyTableType = (typeof keyTable)[number]
type DataType = Record<KeyTableType, string | number>

const HomePage = () => {
  // import
  const { setLoading } = useLoading()
  const { t } = useTranslation()
  // variable
  const [paginate, setPaginate] = useState<IPaginate>(defaultPaginate)
  const [page, setPage] = useState<number>(defaultPaginate.page)
  const [data, setData] = useState<DataType[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IMatchSchema>({
    resolver: zodResolver(MatchSchema),
    criteriaMode: "all",
    mode: "all",
    reValidateMode: "onChange",
  })

  // utile
  const handleFetchData = async (_page: number) => {
    try {
      setLoading(true)
      const _value = getValues()
      let path = `/match/list?page=${_page}&perPage=${paginate.perPage}`
      if (_value.player?.trim()) {
        path += `&playerId=${_value.player.trim()}`
      }
      if (!_value.type?.startsWith("All ")) {
        path += `&type=${_value.type}`
      }
      if (!_value.status?.startsWith("All ")) {
        path += `&status=${_value.status}`
      }
      const _res = await fetchApi.get(path)
      const _data = _res.data.data.data
      setData(_data.data)
      setPaginate({
        ...defaultPaginate,
        total: _data.total,
        totalPage: _data.totalPage,
      })
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
    handleFetchData(1)
  }, [])

  useEffect(() => {
    handleFetchData(page)
  }, [page])

  // render
  return (
    <div className="content">
      <Container className="content-panel d-flex flex-column h-100 gap-3">
        <Form className="flex-grow-0" id="filter">
          <Row>
            <Col xs={12} className="d-none d-md-block">
              <h3>Search</h3>
            </Col>
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <Form.Group controlId="formPlayerId">
                <Form.Control
                  type="text"
                  placeholder="Search (player id)"
                  {...register("player")}
                />
              </Form.Group>
            </Col>
            <Col xs={6} md={3} className="mb-3 mb-md-0">
              <Form.Select aria-label="Type" {...register("type")}>
                <option>All type</option>
                {Object.values(EMatchType).map((_type, _index) => (
                  <option key={_index} value={_type}>
                    {_type}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={6} md={3} className="mb-3 mb-md-0">
              <Form.Select aria-label="Status">
                <option>All status</option>
                {Object.values(EQueueStatus).map((_type, _index) => (
                  <option key={_index} value={_type}>
                    {_type}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={2} className="mb-3 mb-md-0 mt-auto">
              <Button
                variant="primary"
                type="button"
                className="form-control"
                onClick={() => handleFetchData(1)}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        <div className="flex-fill overflow-auto">
          <Table responsive striped bordered hover id="table">
            <thead className="sticky-top bg-white">
              <tr>
                {keyTable.map((_title, index) => (
                  <th key={index}>{_title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((_data, _index) => (
                <tr key={_index}>
                  {keyTable.map((_title, index) => {
                    if (_title === "#") {
                      return <td key={index}>{_index + 1}</td>
                    } else if (_title.endsWith("edAt")) {
                      return (
                        <td key={index}>
                          {dayjs(_data[_title]).format("YYYY/MM/DD")}
                        </td>
                      )
                    } else {
                      return <td key={index}>{_data[_title]}</td>
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Pagination className="mb-0 flex-grow-0 mx-auto" id="pagination">
          <ReactPaginate
            pageCount={paginate.totalPage}
            renderOnZeroPageCount={null}
            previousLabel={null}
            nextLabel={null}
            breakLabel={null}
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(e: { selected: number }) => setPage(e.selected + 1)}
            containerClassName="pagination justify-content-center"
            activeClassName="active"
            initialPage={page - 1}
          />
        </Pagination>
      </Container>
    </div>
  )
}

export default HomePage
