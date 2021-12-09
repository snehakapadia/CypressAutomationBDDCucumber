import { expect } from "chai";
import { Given , And , Then , When} from "cypress-cucumber-preprocessor/steps";
const locators = require('../objectRepo.json');

var gSubtotalAmt = 0;
var gPrice = 0;
var arrNumAllPrices = [];
    
//test steps 
Given('User navigates to url', () => {
    cy.visit(Cypress.env('URL'));
    gSubtotalAmt = 0;
})

When('User adds {string} to cart', tShirtName => {
    var xpath = locators['Add to Cart'].replace('<tShirtName>',tShirtName);
    cy.log("xpath: " + xpath);
    var priceXpath = locators['TShirtPrice'].replace('<tShirtName>',tShirtName);
    cy.log("priceXpath: " + priceXpath);
    cy.xpath(priceXpath).invoke('text').then((text) => {
        gPrice = text;
        text = text.replace(/\s/g,'').replace('$','');
        text = parseFloat(text);
        //text = Number(text);
        gSubtotalAmt = gSubtotalAmt + text;
        cy.log(gSubtotalAmt);
    });
    cy.xpath(xpath).click();
})

Then('User verifies {string} on checkout', tShirtName => {
    console.log(gPrice);
    var priceXpath = locators['TShirtPriceCheckout'].replace('<tShirtName>',tShirtName);
    //cy.xpath(priceXpath).should('have.text',gPrice);
    cy.xpath(priceXpath).invoke('text').then((text) => {
        text = text.replace(/\s/g,'');
        expect(text).to.equal(gPrice);
        //cy.xpath(closeCart).click();
    });

})

//User verifies "SUBTOTAL"
Then('User verifies {string}', subTotal => {
    console.log(gSubtotalAmt);
    //var priceXpath = locators['TShirtPriceCheckout'].replace('<tShirtName>',tShirtName);
    //cy.xpath(priceXpath).should('have.text',gPrice);
    cy.xpath(locators['Subtotal']).invoke('text').then((text) => {
        text = text.replace(/\s/g,'');
        text = text.replace('$','');
        text = parseFloat(text);
        expect(text).to.equal(gSubtotalAmt);
    });

})

When('User clicks on {string} button', buttonName => {
    var xpath = locators['Button'].replace('<buttonName>', buttonName);
    //cy.xpath(xpath).trigger('mouseover').click();
    cy.xpath(xpath).click();
})

// Then('User verifies {string} on Alert Box', (text) => {
//     cy.on("window: alert", function(str) {
//         cy.log(str);
//         expect(str).to.equal("Checkout - Subtotal: $ 102.35");
//     });
// })

When('User gets prices of all Items', () => {
    cy.xpath(locators['AllPrices']).invoke('text').then((text) => {
        var arrtext = text.split('$');
        
        for (var i = 1; i < arrtext.length; i++){
            arrNumAllPrices[i] = parseFloat(arrtext[i]).toFixed(2);
        }

        //Sorting the array from Asc to desc
        arrNumAllPrices.sort(function(a, b) {
            return a - b;
        });
    });
})

When('User {string} from {string} and verifies the sort', (sort, value) => {
    cy.xpath('//div[@class="sort"]/select').select(value);
    cy.wait(1000);
    cy.xpath(locators['AllPrices']).invoke('text').then((text) => {
        var expected = '';
        if(value == 'Highest to lowest')
        {
            arrNumAllPrices.reverse();
        }
        //Forming the expected string
        for(var i = 0;i<arrNumAllPrices.length;i++)
        {
            cy.log(arrNumAllPrices[i]);
            if(arrNumAllPrices[i] != 'undefined' && arrNumAllPrices[i] != '' && arrNumAllPrices[i] != null)
            {
                expected = expected + '$' + arrNumAllPrices[i];
            }
        }
        cy.log(expected);
        cy.log(text);
        expect(text).to.equal(expected);
    });
})

When('User clicks {string} in the cart for {string} tshirt', (buttonName, tShirtName) => {
    var xpathP = '';
    var priceXpath = locators['TShirtPriceCheckout'].replace('<tShirtName>',tShirtName);
    cy.xpath(priceXpath).invoke('text').then((text) => {
        text = text.replace(/\s/g,'');
        text = text.replace('$','');
        text = parseFloat(text);
        if(buttonName.includes('Plus'))
        {
            xpathP = locators['checkoutPlus'].replace('<tShirtName>',tShirtName);
            gSubtotalAmt = gSubtotalAmt + text;
        }
        else if(buttonName.includes('Minus'))
        {
            xpathP = locators['checkoutMinus'].replace('<tShirtName>',tShirtName);
            gSubtotalAmt = gSubtotalAmt - text;
        }
        cy.xpath(xpathP).click();
    });    
})

When('User removes {string} tshirt', (tShirtName) => {
    var xpathP = locators['removeTshirt'].replace('<tShirtName>',tShirtName);
    var priceXpath = locators['TShirtPriceCheckout'].replace('<tShirtName>',tShirtName);
    cy.xpath(priceXpath).invoke('text').then((text) => {
        text = text.replace(/\s/g,'');
        text = text.replace('$','');
        text = parseFloat(text);
        gSubtotalAmt = gSubtotalAmt - text;
        cy.xpath(xpathP).click();
    });
})

When('User clicks on first Add to cart', () => {
    cy.wait(1000);
    cy.xpath(locators['firstAddToCart']).click();
})

Then('User verifies {string} in product desc', (filterName) => {
    cy.log(filterName);
    cy.xpath(locators['firstDesc']).invoke('text').then((text) => {
        
        cy.log(text);
        expect(text.startsWith(filterName)).to.be.true;
    });
})


