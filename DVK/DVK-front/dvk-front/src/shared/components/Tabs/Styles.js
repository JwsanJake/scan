import styled, { css } from "styled-components";

export const TabHeader = styled.div`
	gap: 20px;
	display: flex;
	align-items: flex-start;
	border-color: rgba(212, 216, 225, 1);
	border-bottom: 1px solid #d4d8e1;
`

export const TabContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px 0 10px 0px;
`

export const TabHeaderNavigation = styled.div`
	gap: 50px;
	display: flex;
	padding: 0 0 10px;
	align-items: flex-start;
	font-weight: 600;
	font-size: 15px;
	line-height: 22px;
	color: #75809e;
`

export const TabHeaderText = styled.div`
	height: auto;
	text-align: left;
	display: flex;
	flex-direction: row;
	font-size: 18px;
	// border: 1px solid black;
	// padding: 20px;
	// border-radius: 5px;
`

export const TabsWrapper = styled.div`
	background-color: white;
	margin: 1rem auto 1rem;
	color: black;
	border-radius: 1.5rem;
	height: 100%;
`

export const TabsNavigation = styled.div`
	width: 60%;
	margin: 0 auto 2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid #1677FF;
	border-radius: 2rem;
	padding-left: 0px;

	@media (max-width: 768px) {
		width: 90%;
	}
`

export const TabsNavigationItem = styled.div`
	width: 50%;
	padding: 1rem;
	list-style: none;
	text-align: center;
	cursor: pointer;
	transition: all 0.7s;
	border-bottom-left-radius: 2rem;
	border-top-left-radius: 2rem;

	&:hover {
		background: rgba(50, 224, 196, 0.15);
	}

	&:active {
		background: #1677FF;
	}
`

export const Tab = styled.p`
	font-size: 2rem;
	text-align: center;
`

export const CancelButton = styled.div`
	background: white;
	border: none;
	line-height: 16px;
	height: 24px;
	margin-left: 5px;
	font-size: 24px;
`

export const TabNavContainer = styled.div`
	display: flex;
	gap: 2px;
`

export const TabContentContainer = styled.div`
	height: 100%;
	position: relative;
`
