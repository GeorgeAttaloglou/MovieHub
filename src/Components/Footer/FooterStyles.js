import styled from "styled-components";

export const Box = styled.div`
    padding: 1% 1%;
    background: black;
    bottom: 0;
    width: 100%;

    @media (max-width: 1000px) {
        // padding: 70px 30px;
    }
`;

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(
        auto-fill,
        minmax(190px, 1fr)
    );
    grid-gap: 13px;

    @media (max-width: 1000px) {
        grid-template-columns: repeat(
            auto-fill,
            minmax(200px, 1fr)
        );
    }
`;

export const FooterLink = styled.a`
    color: #fff;
    margin-bottom: 10px;
    font-size: 24;
    text-decoration: none;

    &:hover {
        color: Purple;
        transition: 200ms ease-in;
    }
`;

export const Heading = styled.p`
    font-size: 20px;
    color: #fff;
    margin-bottom: 10px;
    font-weight: bold;
`;
