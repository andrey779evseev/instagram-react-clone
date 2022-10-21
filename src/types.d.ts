//for Switch component, possibility to add value attribute for div tag
declare namespace JSX {
	interface ExtendedDiv
		extends React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
		value?: unknown
	}

	interface IntrinsicElements {
		div: ExtendedDiv
	}
}
