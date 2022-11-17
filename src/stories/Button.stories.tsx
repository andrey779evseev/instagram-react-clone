import type { Meta, StoryObj } from '@storybook/react'
import Button from '@components/common/button/Button'
import { EnumButtonTheme } from '@models/enums/EnumButtonTheme'

export default {
	title: 'Button',
	component: Button,
	tags: ['docsPage'],
	argTypes: {
		children: {
			description: 'Children of component',
		},
	},
} as Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Primary: Story = {
	args: {
		theme: EnumButtonTheme.Primary,
		children: 'Primary',
	},
}

export const Secondary: Story = {
	args: {
		theme: EnumButtonTheme.Secondary,
		children: 'Secondary',
	},
}
