import {SxProps } from '@mui/material'

//пример написания стилей в MUI в виде объекта для sx
// export const buttonContainerSX: SxProps = {
//   display: "flex",
//   justifyContent: "space-between",
// };

//если у нас есть какая то логика по вычислению св-в в зависимости от просов то в виде функции 
//в компоненте в sx прописываем этот объект либо функцию c вызываемым аргументом

export const getListItemSx = (isDone: boolean): SxProps => ({
	opacity: isDone ? 0.3 : 1,
	display: 'flex'
}
);
//как пример того же самого функционала что и выше, но с помощью reusable component и styled()
// type IsDoneType = {
//   isDone: boolean;
// };
// export const StyledListItem = styled(ListItem)<IsDoneType>(({ isDone }) => ({
//   justifyContent: "space-between",
//   padding: 0,
//   opacity: isDone ? 0.3 : 1,

//   "&:hover": {
//     background: "#ededed6d",
//     borderRadius: "4px",
//     button: {
//       display: "block",
//     },
//   },
// }));


//стиль для заголовка тудулиста


export const todolistTitleStyle = {
  margin: "10px 0 20px",
  fontSize: "22px",
	fontWeight: '500',
};


export const ItemWithHoverStyle = {
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
	transition: "all 0.3s ease 0s",

  "&:hover": {
    background: "#ededed6d",
    borderRadius: "4px",
    button: {
      display: "block",
    },
  },
};