import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
display: flex;
align-items: flex-end;
gap: 10px;
flex-wrap: wrap;
background-color: #fff;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
`;

const InputArea = styled.div`
display: flex;
flex-direction: column;
`;

const Input = styled.input`
width: 145px;
padding: 0 10px;
border: 1px solid #bbb;
border-radius: 5px;
height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
cursor: pointer;
padding: 10px;
border: none;
border-radius: 5px;
background-color: #000000;
color: white;
height: 42px;

&:hover {
    background-color: #229954;
  }
`;


const Form = ({ onEdit, setOnEdit, getLote }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const lote = ref.current;

            lote.area.value = onEdit.area;
            lote.quadra.value = onEdit.quadra;
            lote.numero.value = onEdit.numero;
            lote.endereco.value = onEdit.endereco;
            lote.disponibilidade.value = onEdit.disponibilidade;
            lote.proprietario.value = onEdit.proprietario;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const lote = ref.current;

        if (
            !lote.area.value ||
            !lote.quadra.value ||
            !lote.numero.value ||
            !lote.endereco.value ||
            !lote.disponibilidade.value ||
            !lote.proprietario.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.id, {
                    area: lote.area.value,
                    quadra: lote.quadra.value,
                    numero: lote.numero.value,
                    endereco: lote.endereco.value,
                    disponibilidade: lote.disponibilidade.value,
                    proprietario: lote.proprietario.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800", {
                    area: lote.area.value,
                    quadra: lote.quadra.value,
                    numero: lote.numero.value,
                    endereco: lote.endereco.value,
                    disponibilidade: lote.disponibilidade.value,
                    proprietario: lote.proprietario.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        lote.area.value = "";
        lote.quadra.value = "";
        lote.numero.value = "";
        lote.endereco.value = "";
        lote.disponibilidade.value = "";
        lote.proprietario.value = "";

        setOnEdit(null);
        getLote();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Área</Label>
                <Input name="area" />
            </InputArea>
            <InputArea>
                <Label>Quadra</Label>
                <Input name="quadra" placeholder="Número ou Nome"/>
            </InputArea>
            <InputArea>
                <Label>Número</Label>
                <Input name="numero" placeholder="Número do Lote" type="number" min={0}/>
            </InputArea>
            <InputArea>
                <Label>Endereço</Label>
                <Input name="endereco" />
            </InputArea>
            <InputArea>
                <Label>Disponibilidade</Label>
                <Input name="disponibilidade" placeholder="Está a venda?" maxLength={3} />
            </InputArea>
            <InputArea>
                <Label>Proprietário</Label>
                <Input name="proprietario" />
            </InputArea>
            <Button type="submit">CADASTRAR</Button>
        </FormContainer>
    );
};

export default Form; 