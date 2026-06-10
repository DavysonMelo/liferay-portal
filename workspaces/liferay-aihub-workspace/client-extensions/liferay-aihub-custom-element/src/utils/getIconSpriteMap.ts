/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import iconsSpriteMapURL from '../assets/icons.svg';

/**
 * Resolves the Clay icon spritemap URL. The widget is Liferay DXP agnostic and
 * must render identically on any host, so it always uses the minimal spritemap
 * bundled at build time (scripts/buildSpritemap.mjs) rather than reaching for a
 * portal provided spritemap.
 */
export default function getIconSpriteMap(): string {
	return iconsSpriteMapURL;
}
