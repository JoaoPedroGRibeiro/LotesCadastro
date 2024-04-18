import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
width: 100%;
background-color: #fff;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
max-width: 1200px;
margin: 20px auto;
world-break: break-all;
`;

const StyledFaEdit = styled(FaEdit)`
    color: #229954;
`;

const StyledFaTrash = styled(FaTrash)`
    color: #CF1D1D;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
text-align: start;
border-bottom: inset;
padding-bottom: 5px;

`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

`;


const Grid = ({ loteamento, setLote, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = loteamento.filter((lote) => lote.id !== id);

                setLote(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th> Área </Th>
                    <Th> Quadra </Th>
                    <Th> Número </Th>
                    <Th> Endereço </Th>
                    <Th> Disponibilidade</Th>
                    <Th> Proprietário</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {loteamento.map((item, i) => (
                    <Tr key={i}>
                        <Td width="10%">{item.area}</Td>
                        <Td width="8%">{item.quadra}</Td>
                        <Td width="8%">{item.numero}</Td>
                        <Td width="15%" onlyWeb>
                            {item.endereco}
                        </Td>
                        <Td width="15%">{item.disponibilidade}</Td>
                        <Td width="15%">{item.proprietario}</Td>
                        <Td alignCenter width="3%">
                            <StyledFaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td alignCenter width="3%">
                            <StyledFaTrash onClick={() => handleDelete(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;