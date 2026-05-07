/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

interface UseStepNavigationOptions {
	backURL?: string;
	cancelURL?: string;
	continueURL?: string;
	onBack?: () => void;
	onCancel?: () => void;
	onContinue?: () => void;
}

interface StepNavigationHandlers {
	handleBack: () => void;
	handleCancel: () => void;
	handleContinue: () => void;
}

export default function useStepNavigation({
	backURL,
	cancelURL,
	continueURL,
	onBack,
	onCancel,
	onContinue,
}: UseStepNavigationOptions): StepNavigationHandlers {
	return {
		handleBack: () => {
			if (onBack) {
				onBack();
			}
			else if (backURL) {
				Liferay.Util.navigate(backURL);
			}
		},
		handleCancel: () => {
			if (onCancel) {
				onCancel();
			}
			else if (cancelURL) {
				Liferay.Util.navigate(cancelURL);
			}
		},
		handleContinue: () => {
			if (onContinue) {
				onContinue();
			}
			else if (continueURL) {
				Liferay.Util.navigate(continueURL);
			}
		},
	};
}
