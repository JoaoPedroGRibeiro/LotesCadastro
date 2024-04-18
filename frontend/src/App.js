import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
margin-bottom: 10px;
`;

function App() {
  const [loteamento, setLote] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getLote = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setLote(res.data.sort((a, b) => (a.quadra > b.quadra ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getLote();
  }, [setLote]);

  return (
    <>
      <Container>
        <Title>LOTES</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getLote={getLote} />
        <Grid setOnEdit={setOnEdit} loteamento={loteamento} setLote={setLote} />
      </Container>
      
      <GlobalStyle />
    </>
  );
}

export default App;