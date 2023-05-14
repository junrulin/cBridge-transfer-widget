import { Grid, GridTypeMap, Container } from '@mui/material';

interface ColProps {
  className?: string;
  style?: object;
  justify?: string;
  align?: string;
  children: any;
  xs?: any;
  onClick?: any;
}

export function Col(props: ColProps) {
  return (
    <Grid
      {...props}
      item
      style={{
        ...props.style,
        justifyContent: props.justify,
        alignItems: props.align || 'middle',
      }}
    >
      {props?.children}
    </Grid>
  );
}
