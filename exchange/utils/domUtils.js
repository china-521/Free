import attributeUtils from "../../utils/dom/attribute/attribute.js"
import classUtils from "../../utils/dom/attribute/class.js"
import event from "../../utils/dom/event/event.js"
import eventBus from "../../utils/dom/event/eventBus.js"
import pubSub from "../../utils/dom/event/pubSub.js"
import {
	enterPage
} from "../../utils/dom/event/enterPage.js"
import {
	leavePage
} from "../../utils/dom/event/leavePage.js"
import {
	beforeUnload
} from "../../utils/dom/event/beforeUnload.js"
import {
	eventDelegation
} from "../../utils/dom/event/eventDelegation.js"
import {
	scroll
} from "../../utils/dom/event/scroll.js"
import {
	click
} from "../../utils/dom/event/click.js"
import {
	$html,
	html
} from "../../utils/dom/attribute/html.js"
import {
	text,
	_text
} from "../../utils/dom/attribute/text.js"
import {
	animation
} from "../../utils/dom/effect/animation.js"
import {
	show,
	hide
} from "../../utils/dom/effect/show.js"
import {
	_draggable,
	draggable
} from "../../utils/dom/effect/draggable.js"

import {
	drag,
	_drag
} from "../../utils/dom/event/drag.js"

import {
	css,
	setStyle,
	getStyle,
	getCssText,
	parseCssText,
	toCssText,
	_toCssText,
} from "../../utils/dom/css/css.js"
import {
	createElement
} from "../../utils/dom/element/createElement.js"
import {
	getElement
} from "../../utils/dom/element/getElement.js"
import {
	getOuterHTML
} from "../../utils/dom/element/getOuterHTML.js"
import {
	title
} from "../../utils/dom/attribute/title.js"
import {
	keywords
} from "../../utils/dom/attribute/keywords.js"
import {
	description
} from "../../utils/dom/attribute/description.js"
import {
	remove,
	_remove
} from "../../utils/dom/element/remove.js"
import {
	pageDown
} from "../../utils/dom/effect/pageDown.js"

export default {
	toFunction: {
		$html,
		_text,
		_toCssText,
		_draggable,
		_remove,
		_drag,
		animation,
		enterPage,
		leavePage,
		beforeUnload,
		setStyle,
		getStyle,
		getCssText,
		parseCssText,
		toCssText,
		attributeUtils,
		classUtils,
		event,
		eventBus,
		pubSub,
		eventDelegation,
		scroll,
		createElement,
		getElement,
		getOuterHTML,
		title,
		keywords,
		description,
		pageDown,
	},
	toPrototype: {
		_class: classUtils._class,
		html,
		text,
		css,
		draggable,
		drag,
		show,
		hide,
		attr: attributeUtils.attr,
		click,
		remove
	}
}