import React, { Component, PropTypes } from 'react';
import { Grid, Column } from 'react-cellblock';

import styles from './Carousel.css';

export default class Carousel extends Component {
    static propTypes = {
        current: PropTypes.number.isRequired,
        items: PropTypes.array,
        itemRenderer: PropTypes.any,
        itemProps: PropTypes.object,
        onGoToNext: PropTypes.func.isRequired,
        onGoToPrevious: PropTypes.func.isRequired,
    };

    static defaultProps = {
        current: 0,
        items: [],
    };

    renderItem() {
        const {
            current,
            items,
            itemProps,
            itemRenderer,
        } = this.props;

        if (items.length === 0) {
            return 'You have no items!';
        }

        const props = { ...items[current], ...itemProps };
        return React.createElement(itemRenderer, props);
    }

    render() {
        const {
            onGoToNext,
            onGoToPrevious,
        } = this.props;

        return (
            <div className={styles.container}>
                <Grid>
                    <Column width="1/7">
                        <span
                            onClick={onGoToPrevious}
                            className={styles.direction}
                        >
                            Previous
                        </span>
                    </Column>
                    <Column width="5/7">
                        {this.renderItem()}
                    </Column>
                    <Column width="1/7">
                        <span
                            onClick={onGoToNext}
                            className={styles.direction}
                        >
                            Next
                        </span>
                    </Column>
                </Grid>
            </div>
        );
    }
}
