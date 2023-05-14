import { Grid, GridTypeMap } from '@mui/material';

interface RowProps{
  className?: string;
  style?: object;
  justify?: string;
  align?: string;
  children?: any;
  spacing?: string|number;
  direction?: string;
}

export function Row(props: RowProps) {
  return (
    <Grid
      container
      {...props}
      className={props?.className}
      style={{
        justifyContent: props.justify,
        alignItems: props.align,
        flexDirection: props.direction || 'row',
        ...props.style,
      }}
    >
      {props?.children}
    </Grid>
  );
}
