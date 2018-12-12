import React, { Component } from 'react';
import D3Feld from './D3Feld';
import Axis from './Axis';
import D3RenderDataLines from './D3RenderDataLines'
import D3ResponsiveElements from './D3ResponsiveElements'
import D3Container from './D3Container'

class D3Components extends Component {

    render() {
        return (
            <D3Container>
                <D3Feld>
                    <Axis>
                        <D3RenderDataLines />
                        <D3ResponsiveElements />
                    </Axis>
                </D3Feld>
            </D3Container >
        )
    }
}

export default D3Components