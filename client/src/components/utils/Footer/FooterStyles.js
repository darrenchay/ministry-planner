import styled from 'styled-components';

export const Box = styled.div`
padding: 50px 0px;
background: white;
position: absolute;
bottom: 0;
width: 100%;

`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	background: white; 
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 50px;
background-color: white
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(400px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}

`;

export const FooterLink = styled.a`
color: #000;
margin: 5px 0px;
font-size: 16px;
text-decoration: none;

&:hover {
	text-decoration: underline;
}
`;

export const Line = styled.p`
font-size: 16px;
color: #000;
margin: 5px 10px
`;
