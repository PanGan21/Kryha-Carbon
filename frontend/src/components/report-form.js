import React, { useState } from "react"
import styled from 'styled-components'
import { toast } from "react-toastify";

import { useStoreContext } from "../context";
import {ReactComponent as BackArrow} from '../assets/icons/back-arrow.svg'
import { ButtonPrimary } from "../styles/components/button"
import {Inputs, Text} from "../styles/components"
import { createReport, getReports } from "../actions/report"
import { useStore } from "../context"
import color from "../styles/color"
import { useHistory } from "react-router-dom"
import ROUTES from "../router/routes"
import { StarRating } from "./shared/star-rating"

const ReportForm = () => {

  const history = useHistory()
  const [{ user }, dispatch] = useStoreContext();
    const [state, setState] = useState({
      year: "",
      emissions: "",
      product: "",
      compensation: "",
      ratio: 3
    })

    const handleSubmit = async (event) => {
      event.preventDefault()
      const res = await createReport({
        email: user.email,
        report: {
          emissions: parseInt(state.emissions),
          year: parseInt(state.year),
          stars: parseInt(Math.round(Math.random()*3)),
        }
      });

      if (res) {
        await getReports(user.email, dispatch);
        toast.success("Report successfully created");
        return history.push(ROUTES.REPORTS);
      } else {
        return toast.error("Report creation error, please try again later");
      }
    }

  const handleInput = (event)=>setState(prevState=>({...prevState, [event.target.name]: event.target.value}))

  return(
    <Container>
      <BackArrow style={{ marginTop: "40px", cursor: "pointer" }} onClick={()=>history.push(ROUTES.REPORTS)}/>
      <div style={{marginBottom: "60px", borderBottom: "1px solid "+ color.darkPurple, width: "100%"}}>
        <h2>Create Report</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <Row>
          <H3>YEAR</H3>
          <Inputs.Input width="346px" value={state.year} name="year" onChange={handleInput} />
          <H3></H3>
        </Row>
        <Row>
          <H3>EMISSIONS</H3>
          <Inputs.Input width="346px" transparent value={state.EMISSIONS} name="emissions" onChange={handleInput} />
          <H3>tonnes co2</H3>
        </Row>
        <Row>
          <H3>PRODUCT</H3>
          <Inputs.Input width="346px" transparent value={state.product} name="product" onChange={handleInput} />
          <H3>tonnes</H3>
        </Row>
        <Row>
          <H3>COMPENSATION</H3>
          <Inputs.Input width="346px" transparent value={state.compensation} name="compensation" onChange={handleInput} />
          <H3>tonnes co2</H3>
        </Row>
        <Row>
          <H3>RATING</H3>
          <Inputs.Input width="346px" value={state.ratio} name="ratio" onChange={handleInput} />
          <StarRating rating={Number(state.ratio)} width="200px"/>
        </Row>

        <ButtonPrimary style={{marginTop: "80px", marginLeft: "525px"}}>DONE</ButtonPrimary>
      </form>
    </Container>
  )
}

export default ReportForm

const Container = styled.div`
    padding: 0 100px;
    width: 100%;
    margin: 0 auto;

    h2 {
        font-weight: 700;
        font-size: 40px;
        color: ${color.neon};
        margin-bottom: 60px;
    }
`;

const H3 = styled(Text.H3)`
  width: 200px;
  text-transform: uppercase;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`
