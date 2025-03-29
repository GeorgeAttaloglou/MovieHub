import React from "react";
import {
	Box,
	FooterContainer,
	Row,
	Column,
	FooterLink,
	Heading,
} from "./FooterStyles";

const Footer = () => {
	return (
		<Box>
			<h1
				style={{
					color: "purple",
					textAlign: "center",
					marginTop: "10px",
				}}
			>
				A place to track your movie history!
			</h1>
			<FooterContainer>
				<Row>
					<Column>
						<Heading><FooterLink href="/about">About</FooterLink></Heading>
					</Column>
					<Column>
						<Heading><FooterLink href="/create-list">Make a list!</FooterLink></Heading>
					</Column>
					<Column>
						<Heading><FooterLink href="/browse-movies">Browse</FooterLink></Heading>
					</Column>
					<Column>
						<Heading><FooterLink href="/profile">Profile</FooterLink></Heading>
					</Column>
				</Row>
			</FooterContainer>
			<h3
				style={{
					color: "purple",
					textAlign: "center",
					marginTop: "10px",
				}}
			>
				Copyright 2025©. All rights reserved.
			</h3>
		</Box>
	);
};
export default Footer;
