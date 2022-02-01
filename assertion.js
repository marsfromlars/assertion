class Result {
    constructor( expression, message, result, details ) {
        this.expression = expression
        this.message = message
        this.result = result
        this.details = details
    }
}

class Results {
    results = []
    add( result ) {
        this.results.push( result )
    }
}

function getResults() {
    if( !document.results ) {
        document.results = new Results()
    }
    return document.results
}

function assert( expression, message ) {

    assertEquals( 'true', expression, message )

}

function assertEquals( expected, actual, message ) {

    let expression = actual + ' == ' + expected
    let result = 'OK'

    try {

        let expectedResult = eval( expected )
        let actualResult = eval( actual )
        let details = ''
        if( actualResult != expectedResult ) {
            details = 'Expected: ' + expectedResult + ' but was ' + actualResult
            result = 'Failed'
        }
        getResults().add( new Result( expression, message, result ) )
    
    }
    catch( ex ) {

        getResults().add( new Result( expression, message, 'Error', '' + ex ) )

    }
    
}

function printResults( targetEl ) {

    targetEl = targetEl ? targetEl : document.body

    let table = document.createElement( 'table'  )
    table.setAttribute( 'border', '1' )
    targetEl.appendChild( table )

    let tr = document.createElement( 'tr' )
    table.appendChild( tr )
    let td = document.createElement( 'th' )
    td.innerHTML = 'Result'
    tr.appendChild( td )
    td = document.createElement( 'th' )
    td.innerHTML = 'Expression'
    tr.appendChild( td )
    td = document.createElement( 'th' )
    td.innerHTML = 'Message'
    tr.appendChild( td )
    td = document.createElement( 'th' )
    td.innerHTML = 'Details'
    tr.appendChild( td )

    getResults().results.forEach( result => {
        let tr = document.createElement( 'tr' )
        tr.setAttribute( 'class', result.result )
        table.appendChild( tr )
        let td = document.createElement( 'td' )
        td.innerHTML = result.result
        tr.appendChild( td )
        td = document.createElement( 'td' )
        td.innerHTML = result.expression ? result.expression : '-'
        tr.appendChild( td )
        td = document.createElement( 'td' )
        td.innerHTML = result.message ? result.message : '-'
        tr.appendChild( td )
        td = document.createElement( 'td' )
        td.innerHTML = result.details ? result.details : '-'
        tr.appendChild( td )
    })

} 
