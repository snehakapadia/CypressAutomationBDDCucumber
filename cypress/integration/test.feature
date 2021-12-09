Feature: Testing Scenarios

    Scenario: Happy Flow with Checkout
        Given User navigates to url
        When User adds "Dark Thug Blue-Navy T-Shirt" to cart
        Then User verifies "Dark Thug Blue-Navy T-Shirt" on checkout
        When User adds "Skuul" to cart
        Then User verifies "Skuul" on checkout
        And User verifies "SUBTOTAL"
        When User clicks on "Checkout" button
        # Then User verifies "test" on Alert Box

    Scenario: Sorting Functionality Check Scenario
        Given User navigates to url
        When User gets prices of all Items
        And User "sort" from "Lowest to highest" and verifies the sort
        And User "sort" from "Highest to lowest" and verifies the sort

    Scenario: Cart Add/Remove Scenario
        Given User navigates to url
        When User adds "Dark Thug Blue-Navy T-Shirt" to cart
        Then User verifies "Dark Thug Blue-Navy T-Shirt" on checkout
        When User adds "Skuul" to cart
        Then User verifies "Skuul" on checkout
        When User adds "Born On The Streets" to cart
        Then User verifies "Born On The Streets" on checkout
        And User verifies "SUBTOTAL"
        When User clicks "checkoutPlus" in the cart for "Dark Thug Blue-Navy T-Shirt" tshirt
        When User clicks "checkoutPlus" in the cart for "Dark Thug Blue-Navy T-Shirt" tshirt
        Then User verifies "SUBTOTAL"
        When User clicks "checkoutMinus" in the cart for "Dark Thug Blue-Navy T-Shirt" tshirt
        Then User verifies "SUBTOTAL"
        When User removes "Born On The Streets" tshirt
        Then User verifies "SUBTOTAL"

    Scenario: Cart Remove Product Scenario
        Given User navigates to url
        When User adds "Born On The Streets" to cart
        Then User verifies "Born On The Streets" on checkout
        And User verifies "SUBTOTAL"
        When User removes "Born On The Streets" tshirt
        Then User verifies "SUBTOTAL"

    Scenario: Filter Functionality Scenario
        Given User navigates to url
        When User clicks on "M" button
        And User clicks on first Add to cart
        Then User verifies "M" in product desc
