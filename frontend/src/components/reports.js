import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory, Redirect } from "react-router-dom";
import { useStore, useStoreContext } from '../context';

import { ListItem, ListItemContainer } from "./shared/list-item";
import { color } from '../assets/color';
import { ReactComponent as Plus } from '../assets/icons/plus.svg';
import ROUTES from '../router/routes';
import { getReports } from "../actions/report";

const years = [
    new Date().getFullYear(),
    new Date().getFullYear() - 1,
    new Date().getFullYear() - 2,
]

export const Reports = () => {
    const history = useHistory();
    const [{ user, reports }, dispatch]= useStoreContext();

    useEffect(() => {
        async function GetReports() {
            getReports(dispatch)
        }
        GetReports()
        console.log(reports)
    }, [dispatch])

	if (user.accountType === "downstream") return <Redirect to={ROUTES.PRODUCTS} />;

	return (
        <Container>
            <Row style={{justifyContent: "flex-start"}}>
                <h2 style={{ cursor: "pointer"}} onClick={()=>history.push(ROUTES.REPORTS)}>Reports</h2>
                <h2 style={{ color: color.darkPurple, paddingLeft: "56px", cursor: "pointer"}} onClick={()=>history.push(ROUTES.VERIFY)}>Verifications (1)</h2>
            </Row>
            <Form onClick={() => history.push(ROUTES.REPORT_FORM)}>
                <p>{new Date().getFullYear() + 1}</p>
                <p>
                    create report
                    &nbsp;
                    <Plus />
                </p>
            </Form>
            {years.map((year, index) => (
                <ListItem
                    leftText={year}
                    rating={index + 1}
                    rightText="audited"
                />
            ))}
        </Container>
    );
};

const Container = styled.div`
    padding: 0 100px;
    width: 100%;
    margin: 0 auto;

    h2 {
        font-weight: 700;
        font-size: 40px;
        color: ${color.green};
        margin-bottom: 60px;
        margin-top: 100px;
    }
`;

const Form = styled(ListItemContainer)`
    display: flex;
    justify-content: space-between;
    background-color: unset;
    border: 1px solid ${color.green};
    cursor: pointer;

    * {
        color: ${color.green};
    }

    p {
        &:nth-child(2) {
            display: flex;
            align-items: center;
		}
    }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`
