import { ChangeEvent, FC } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import { makeStyles } from "@mui/material";


interface PaginationControlledProps {
  totalNumberOfPages: number;
  page: number;
  handlePaginationChange: (event: ChangeEvent<unknown>, page: number) => void;
}

const PaginationControlled: FC<PaginationControlledProps> = ({
  totalNumberOfPages,
  page,
  handlePaginationChange,
}) => {
//   const useStyles = makeStyles(() => ({
//     ul: {
//       "& .MuiPaginationItem-root": {
//         "&.Mui-selected": {
//           background: "#3BFF81",
//           color: "#fff",
//         },
//       },
//     },
//   }));
//   const classes = useStyles();
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalNumberOfPages}
        // classes={{ ul: classes.ul }}
        page={page}
        shape="rounded"
        onChange={handlePaginationChange}
      />
    </Stack>
  );
};

export default PaginationControlled;
