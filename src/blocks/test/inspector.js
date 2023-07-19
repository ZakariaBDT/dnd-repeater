/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, BaseControl, ColorPalette, Button } =
	wp.components;
import { useState } from '@wordpress/element';

import SortableControl from '../../controls/sortable-control';
import SortableItem from '../../controls/sortable-control/sortableitem';

const Inspector = ({ attributes, setAttributes }) => {
	const { content, textColor, items } = attributes;

	const [panel, setPanel] = useState(items.map(() => false)); // Initialize the panel state with an array of false values

	const togglePanel = (index) => {
		const newPanel = [...panel];
		newPanel[index] = !newPanel[index];
		setPanel(newPanel);
	};

	console.log(items);

	return (
		<InspectorControls>
			<PanelBody
				title={__('Drag and Drop ', 'boilerplate')}
				initialOpen={true}
			>
				<SortableControl
					defaultItems={items}
					attributeName="items"
					setAttributes={setAttributes}
				>
					{items &&
						items.map((item, index) => {
							return (
								<div className="dnd-container" key={index}>
									<Button
										className="dnd-trash"
										icon="trash"
										onClick={() => {
											const newItems = [...items];
											newItems.splice(index, 1);
											setAttributes({
												items: newItems,
											});
										}}
									/>

									<SortableItem key={item.id} id={item.id}>
										<PanelBody
											title={item.content}
											initialOpen={false}
										>
											<TextControl
												label={__(
													'Content',
													'boilerplate'
												)}
												value={item.content}
												onChange={(value) => {
													const newItems = [...items];
													newItems[index].content =
														value;
													setAttributes({
														items: newItems,
													});
												}}
											/>
										</PanelBody>
										{/* <div className="zolo-dnd-item">
										<div
											className="header"
											onClick={() => togglePanel(index)}
										>
											<span className="dashicons dashicons-move"></span>
											{item.content}
										</div>
										{panel[index] && (
											<div className="body">
												Body Content
											</div>
										)}
									</div> */}
									</SortableItem>
								</div>
							);
						})}
				</SortableControl>

				<Button
					style={{ marginTop: '10px' }}
					variant="primary"
					icon="plus"
					onClick={() => {
						const newItems = [...items];
						newItems.push({
							id: `${newItems.length + 1}`,
							content: `Item ${newItems.length}`,
						});
						setAttributes({ items: newItems });
					}}
				>
					{__('Add Item', 'boilerplate')}
				</Button>
			</PanelBody>
			<PanelBody
				title={__('Test Block Settings', 'boilerplate')}
				initialOpen={false}
			>
				<TextControl
					label={__('Content')}
					value={content}
					onChange={(v) => setAttributes({ content: v })}
				/>
				<BaseControl label={__('Color', 'boilerplate')} id="color">
					<ColorPalette
						colors={[
							{ name: 'red', color: '#f00' },
							{ name: 'white', color: '#fff' },
							{ name: 'blue', color: '#00f' },
						]}
						value={textColor}
						onChange={(v) => setAttributes({ textColor: v })}
					/>
				</BaseControl>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
