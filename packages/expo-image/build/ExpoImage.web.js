import React from 'react';
import { resolveContentFit, resolveContentPosition } from './utils';
const resolveAssetSource = (source) => {
    if (source == null)
        return null;
    if (typeof source === 'string') {
        return { uri: source };
    }
    if (typeof source === 'number') {
        return { uri: String(source) };
    }
    return source;
};
const ensureUnit = (value) => {
    const trimmedValue = String(value).trim();
    if (trimmedValue.endsWith('%')) {
        return trimmedValue;
    }
    return `${trimmedValue}px`;
};
const getObjectPositionFromContentPosition = (contentPosition) => {
    const resolvedPosition = typeof contentPosition === 'string' ? resolveContentPosition(contentPosition) : contentPosition;
    if (!resolvedPosition)
        return undefined;
    if (!('top' in resolvedPosition || 'bottom' in resolvedPosition)) {
        resolvedPosition.top = '50%';
    }
    if (!('left' in resolvedPosition || 'right' in resolvedPosition)) {
        contentPosition.left = '50%';
    }
    return ['top', 'bottom', 'left', 'right']
        .map((key) => {
        if (key in resolvedPosition) {
            return `${key} ${ensureUnit(resolvedPosition[key])}`;
        }
        return '';
    })
        .join(' ');
};
const ensureIsArray = (source) => {
    if (Array.isArray(source))
        return source;
    if (source === undefined)
        return [];
    return [source];
};
export default function ExpoImage({ source, defaultSource, loadingIndicatorSource, contentPosition, onLoad, onLoadStart, onLoadEnd, onError, ...props }) {
    const { aspectRatio, backgroundColor, transform, borderColor, ...style } = props.style ?? {};
    const resolvedSources = ensureIsArray(source).map(resolveAssetSource);
    return (React.createElement(React.Fragment, null,
        React.createElement("picture", { style: {
                overflow: 'hidden',
                ...style,
            } },
            React.createElement("img", { src: resolvedSources.at(0)?.uri, style: {
                    width: '100%',
                    height: '100%',
                    aspectRatio: String(aspectRatio),
                    backgroundColor: backgroundColor?.toString(),
                    transform: transform?.toString(),
                    borderColor: borderColor?.toString(),
                    objectFit: resolveContentFit(props.contentFit, props.resizeMode),
                    objectPosition: getObjectPositionFromContentPosition(contentPosition),
                } }))));
}
//# sourceMappingURL=ExpoImage.web.js.map