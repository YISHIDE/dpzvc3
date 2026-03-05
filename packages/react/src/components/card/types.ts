export interface cardProps {
  children?: React.ReactNode;
  /** width of the card, defaults to 100% */
  width?: string;
  /** optional header content */
  header?: React.ReactNode;
  /** optional footer content */
  footer?: React.ReactNode;
}
