import { Button, ButtonProps } from "@mui/material"
import React from "react"

//взяли типы из MUI и оюъединили их с нашим типом на сучай если понадобится в будущем свои пропсы передать
type Props = ButtonProps & {}

export const FilterButton = React.memo(({ children, onClick, variant, color }: Props) => {
	return (
		<Button size="small" variant={variant} color={color} onClick={onClick}>
			{children}
		</Button>
	)
})
