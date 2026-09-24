export type LanguageCode = 'en' | 'hi' | 'mr';

export interface TranslationDictionary {
  // Common & Global
  appName: string;
  appTagline: string;
  switchRole: string;
  selectLanguage: string;
  logout: string;
  login: string;
  demoModeNotice: string;
  demoModeBadge: string;
  portalBadge: string;
  verified: string;
  verifiedFarmer: string;
  licensedTrader: string;
  nationalSurveillance: string;
  digitalAgriOS: string;
  search: string;
  filter: string;
  all: string;
  viewAll: string;
  back: string;
  cancel: string;
  confirm: string;
  submit: string;
  save: string;
  status: string;
  actions: string;
  details: string;
  date: string;
  price: string;
  quantity: string;
  total: string;
  loading: string;
  success: string;
  error: string;
  close: string;
  quintal: string;
  ton: string;
  perQuintal: string;
  perKg: string;
  updatedJustNow: string;
  updatedMinsAgo: string;
  phone: string;
  prototypeData: string;
  aiEstimate: string;
  aiAssistedEstimateBadge: string;
  aiAssistedEstimateExplanation: string;
  aiAssistedEstimateInfoTitle: string;
  referencePriceData: string;
  simulatedData: string;
  simulatedBookingNote: string;
  distanceToMandi: string;
  calculatedDistance: string;
  liveData: string;

  // Roles & Selection Screen
  roleSelectionTitle: string;
  roleSelectionSubtitle: string;
  farmer: string;
  farmerDesc: string;
  merchant: string;
  merchantDesc: string;
  government: string;
  governmentDesc: string;
  continueAsFarmer: string;
  continueAsMerchant: string;
  continueAsGovernment: string;
  producerBadge: string;
  procurementBadge: string;
  surveillanceBadge: string;
  apmcLinked: string;
  krushiAiActive: string;
  multiStateSurveillance: string;

  // Auth Modal
  loginTitle: string;
  loginSubtitle: string;
  enterMobile: string;
  enterOtp: string;
  sendOtp: string;
  verifyOtp: string;
  autoFillDemo: string;
  krushiId: string;
  apmcLicense: string;
  govBadgeId: string;
  authDisclaimer: string;
  mobileLabel: string;
  otpCodeLabel: string;
  demoCredentialsNote: string;
  resendOtp: string;
  didntReceiveCode: string;

  // Farmer Nav & Navigation Tabs
  home: string;
  marketPrices: string;
  addProduce: string;
  bestPlaceToSell: string;
  buyerOffers: string;
  farmStore: string;
  salesTracking: string;
  aiAssistant: string;
  profile: string;
  askKrushiAI: string;
  netEarnings: string;

  // Farmer Dashboard
  greeting: string;
  liveMandiTicker: string;
  quickActions: string;
  listNewHarvest: string;
  checkAIPrediction: string;
  viewBuyerBids: string;
  weatherAdvisory: string;
  weatherRainAlert: string;
  weatherUnavailable: string;
  rainProbability: string;
  liveWeather: string;
  weatherAdvisoryHighRain: string;
  weatherAdvisoryModerateRain: string;
  weatherAdvisoryDry: string;
  trendingCrops: string;
  priceTrend: string;
  estimatedEarnings: string;
  recentListings: string;
  kisanId: string;
  acresLabel: string;
  highConfidence: string;
  wheatInsightHeadline: string;
  mandiAggregatedNote: string;
  activeBenchmark: string;
  liveENAM: string;
  peakRateToday: string;
  aboveMSP: string;
  puneMandiYard: string;
  commodity: string;
  category: string;
  trend: string;
  action: string;
  sellThis: string;

  // Farmer Market Prices & Calculator
  marketPricesTitle: string;
  marketPricesSubtitle: string;
  selectCrop: string;
  selectMandi: string;
  netEarningsCalculator: string;
  adjustQuantity: string;
  grossExpected: string;
  transportCost: string;
  handlingCost: string;
  estimatedNetProfit: string;
  bookTransport: string;
  alternativeMarkets: string;
  aiMarketInsight: string;
  sevenDayMovement: string;
  highGrade: string;
  directLogisticsNote: string;
  calculateNetPayout: string;

  // Farmer Add Produce
  addProduceTitle: string;
  addProduceSubtitle: string;
  cropDetails: string;
  cropName: string;
  cropVariety: string;
  variety: string;
  harvestQuantity: string;
  qualityGrade: string;
  gradeA: string;
  gradeB: string;
  gradeC: string;
  expectedPricePerQtl: string;
  farmLocation: string;
  storageLocation: string;
  uploadCropPhoto: string;
  publishListing: string;
  listingSuccess: string;
  useCurrentLocation: string;
  locatingGps: string;
  selectCropType: string;
  gradeNote: string;
  gradePhotoHint: string;
  analyzingGrade: string;
  retakePhoto: string;
  gradeAnalysisConfidence: string;
  gradeAnalysisError: string;
  estimatedListingValue: string;
  activeBuyerBidsWaiting: string;
  submitProduce: string;

  // Farmer Best Place to Sell (Recommendations)
  bestPlaceTitle: string;
  bestPlaceSubtitle: string;
  highestNetProfit: string;
  distance: string;
  sellingPrice: string;
  arbitrageInsight: string;
  initiateSale: string;
  smartLogistics: string;
  aiArbitrageNote: string;
  viewDirectOffers: string;

  // Farmer Buyer Offers
  buyerOffersTitle: string;
  buyerOffersSubtitle: string;
  compareMode: string;
  offeredPrice: string;
  quantityRequired: string;
  totalPayout: string;
  paymentTerms: string;
  acceptOffer: string;
  declineOffer: string;
  offerAccepted: string;
  offerAcceptedPass: string;
  offerDeclined: string;
  directRfqBadge: string;
  directAPMCRFQs: string;
  listedQuantity: string;
  expectedBasePrice: string;
  instantEnamPayout: string;
  pickupFromFarm: string;
  buyerVerificationScore: string;
  bestMatch: string;
  fastPickup: string;
  requiredQuality: string;
  declined: string;
  decline: string;
  backToDashboard: string;

  // Warehouse & Storage Discovery
  findStorage: string;
  warehouseDiscovery: string;
  warehouseDiscoverySubtitle: string;
  nearestWarehouses: string;
  storageDirectoryNote: string;
  wdraRegistered: string;
  wdraEligible: string;
  coldStorage: string;
  dryStorage: string;
  siloStorage: string;
  allTypes: string;
  availableCapacity: string;
  totalCapacity: string;
  dailyRatePerQtl: string;
  selectWarehouse: string;
  selectedWarehouse: string;
  changeWarehouse: string;
  contactWarehouse: string;
  callWarehouse: string;
  selectStorageForProduce: string;
  noStorageSelected: string;
  chooseStorageLocation: string;
  nearestStorageLabel: string;
  searchByDistrict: string;
  allDistricts: string;

  // Store vs Sell Now Comparison
  storeVsSellTitle: string;
  storeVsSellSubtitle: string;
  sellNowOption: string;
  storeAndSellLaterOption: string;
  recommendedChoice: string;
  netProceeds: string;
  storageCostForDuration: string;
  storageDuration: string;
  days: string;
  storageEstimateDisclaimer: string;
  sellingNowHigher: string;
  storingHigher: string;
  calculateStorageComparison: string;
  exploreWarehouses: string;

  // Farmer Store (DBT & Panchayat)
  farmStoreTitle: string;
  farmStoreSubtitle: string;
  certifiedSeeds: string;
  bioFertilizers: string;
  equipmentSubsidies: string;
  houseware: string;
  govSubsidyDiscount: string;
  orderNow: string;
  freeDeliveryToPanchayat: string;
  dbtSubsidyLink: string;
  allInputs: string;
  inStock: string;
  orderSuccessMsg: string;
  deliveryTokenNote: string;
  applySubsidy: string;
  subsidizedPrice: string;
  confirmSubsidizedOrder: string;
  confirmOrder: string;

  // Farmer Sales Tracking
  salesTrackingTitle: string;
  salesTrackingSubtitle: string;
  activeShipments: string;
  completedSales: string;
  trackMandiGatePass: string;
  downloadENAMReceipt: string;
  paymentStatus: string;
  totalRealizedRevenue: string;
  totalHarvestSold: string;
  activeInTransit: string;
  shipment: string;
  activeLotsCount: string;
  directBankDbt: string;
  buyerName: string;
  lotId: string;
  weighbridgeWeight: string;
  settlementSlip: string;
  digitalSettlementSlip: string;
  taxInvoiceId: string;
  paidCleared: string;
  inTransit: string;
  gatePassNumber: string;
  netSettledAmount: string;
  transactionRef: string;
  quantityWeighed: string;
  rateRealized: string;
  netBankTransfer: string;
  directDBTBeneficiary: string;
  downloadInvoice: string;

  // Farmer AI Prediction & Advisory
  predictiveEngine: string;
  aiForecasting: string;
  aiForecastingSubtitle: string;
  updatedToday: string;
  risingTrend: string;
  currentPrice: string;
  expected: string;
  certainty: string;
  modelCalibratedNote: string;
  findBestMandis: string;
  keyMarketDrivers: string;
  lowerRainfall: string;
  lowerRainfallDesc: string;
  highExportDemand: string;
  highExportDemandDesc: string;
  askAIAdvisor: string;
  askLiveQuestion: string;
  send: string;
  aiDisclaimer: string;

  // Farmer Profile
  profileTitle: string;
  kycVerified: string;
  cultivatedLand: string;
  cropSpecialization: string;
  sellerScore: string;
  bankAccountTitle: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  directPayoutEnabled: string;
  portalShortcuts: string;
  governmentSubsidies: string;
  pmKisanActive: string;
  cropInsurancePMFBY: string;

  // Merchant Hub
  merchantDashboardTitle: string;
  merchantDashboardSubtitle: string;
  postRequirement: string;
  directFarmerLots: string;
  placePurchaseBid: string;
  commodityDemandVelocity: string;
  myActiveBids: string;
  procuredOrders: string;
  rabiSeason: string;
  kharifSeason: string;
  farmerLocation: string;
  bidPlacedSuccess: string;
  minOrderQty: string;
  targetBuyPrice: string;
  destinationWarehouse: string;

  // Government Portal
  govSurveillanceTitle: string;
  surveillanceTitle: string;
  govSurveillanceSubtitle: string;
  surveillanceSubtitle: string;
  regionalHotspots: string;
  regionalPriceHotspots: string;
  totalActiveFarmers: string;
  totalTradeVolume: string;
  priceTrendIndex: string;
  supplyForecast: string;
  aiDemandPrediction: string;
  exportReport: string;
  generateAIInsights: string;
  generateInsights: string;
  farmersRegistry: string;
  mspCompliance: string;
  bufferStocks: string;
  nationalFeed: string;
  highRiskDisparity: string;
  moderateVolatility: string;
  strategicPolicyBrief: string;
  generatingPolicyAi: string;

  // Modals & Chat AI
  askAgronomistTitle: string;
  aiChatPlaceholder: string;
  sendQuestion: string;
  transportBookingTitle: string;
  vehicleType: string;
  pickupSlot: string;
  transportConfirmed: string;
  bookingId: string;
  postProcurementTitle: string;
  requirementSuccess: string;
  languageSelectTitle: string;
  languageSelectSubtitle: string;

  // FPO Feature
  fpoNavLabel: string;
  fpoHubTitle: string;
  fpoHubSubtitle: string;
  fpoJoinButton: string;
  fpoJoinedBadge: string;
  fpoMemberCount: string;
  fpoOfficeBearer: string;
  fpoPrimaryCrops: string;
  fpoAggregationToggle: string;
  fpoAggregationHint: string;
  fpoPooledLotBadge: string;
  fpoPooledFrom: string;
  fpoDashboardTitle: string;
  fpoTotalPooled: string;
  fpoNoFpoJoined: string;
  fpoSearchByDistrict: string;

  // Dispute / Grievance
  raiseIssueButton: string;
  disputeCenterTitle: string;
  disputeReasonLabel: string;
  disputeReasonQuality: string;
  disputeReasonPayment: string;
  disputeReasonQuantity: string;
  disputeReasonOther: string;
  disputeNoteLabel: string;
  disputeSubmit: string;
  disputeStatusOpen: string;
  disputeStatusReview: string;
  disputeStatusResolved: string;
  disputeSuccessMessage: string;
  noDisputesYet: string;
  myDisputes: string;

  // Verification & Quality
  verifiedBuyerBadge: string;
  unverifiedBuyerBadge: string;
  gstVerifiedLabel: string;
  qualityTrackRecord: string;
  rateQualityReceived: string;
  qualityRatingSubmitted: string;
  markAsPaidButton: string;
  paymentConfirmedMessage: string;

  // Forecast transparency
  statisticalBaselineBadge: string;
  statisticalBaselineExplanation: string;
  arrivalDataUnavailable: string;
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    // Common & Global
    appName: 'FarmiGo',
    appTagline: 'Unified Agricultural Market Network',
    switchRole: 'Switch Role',
    selectLanguage: 'Language',
    logout: 'Logout',
    login: 'Login',
    demoModeNotice: 'Demo Mode: Click auto-fill to sign in instantly with sample credentials',
    demoModeBadge: 'Sample Persona Active',
    portalBadge: 'Digital Agriculture Network',
    verified: 'Verified',
    verifiedFarmer: 'Verified Farmer',
    licensedTrader: 'Licensed APMC Trader',
    nationalSurveillance: 'National Agriculture Surveillance',
    digitalAgriOS: 'National e-NAM Connected',
    search: 'Search mandi or crop...',
    filter: 'Filter',
    all: 'All',
    viewAll: 'View All',
    back: 'Back',
    cancel: 'Cancel',
    confirm: 'Confirm',
    submit: 'Submit',
    save: 'Save',
    status: 'Status',
    actions: 'Actions',
    details: 'Details',
    date: 'Date',
    price: 'Price',
    quantity: 'Quantity',
    total: 'Total',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    close: 'Close',
    quintal: 'Quintal',
    ton: 'Tons',
    perQuintal: '₹/Quintal',
    perKg: '₹/kg',
    updatedJustNow: 'Updated just now',
    updatedMinsAgo: 'mins ago',
    phone: 'Phone Number',
    prototypeData: 'Prototype Data',
    aiEstimate: 'AI Estimate',
    aiAssistedEstimateBadge: 'AI-Assisted Estimate (LLM-based)',
    aiAssistedEstimateExplanation: 'This estimate is generated by an AI language model based on general market patterns, not a trained statistical model on historical price data. A backtested forecasting model (LightGBM trained on historical Agmarknet data with tracked accuracy) is planned for a future version.',
    aiAssistedEstimateInfoTitle: 'Forecast Methodology & Transparency',
    referencePriceData: 'Reference Price Data',
    simulatedData: 'Simulated Data',
    simulatedBookingNote: 'Notice: Logistics & driver dispatch details are simulated for prototype preview.',
    distanceToMandi: 'Distance to Mandi',
    calculatedDistance: 'Calculated Distance',
    liveData: 'Live Mandi Data',

    // Roles & Selection Screen
    roleSelectionTitle: 'Choose Your Portal',
    roleSelectionSubtitle: 'Seamless direct connection between farmgate, wholesale APMC traders, and policy makers.',
    farmer: 'Farmer',
    farmerDesc: 'Access real-time mandi prices, AI price forecasts, calculate net profit after transport, and sell directly to buyers.',
    merchant: 'Merchant / Trader',
    merchantDesc: 'Browse verified farmer produce lots, post bulk requirements, and execute electronic trade contracts.',
    government: 'Government Official',
    governmentDesc: 'Monitor regional agricultural supply, identify price disparity hotspots, and utilize AI macroeconomic policy insights.',
    continueAsFarmer: 'Enter Farmer Portal',
    continueAsMerchant: 'Enter Merchant Portal',
    continueAsGovernment: 'Enter Surveillance Portal',
    producerBadge: 'Producer',
    procurementBadge: 'Procurement',
    surveillanceBadge: 'Surveillance & Policy',
    apmcLinked: 'e-NAM Integrated',
    krushiAiActive: 'AI Engine Active',
    multiStateSurveillance: 'Multi-State Coverage',

    // Auth Modal
    loginTitle: 'Secure Sign-In',
    loginSubtitle: 'Enter your registered mobile number and ID',
    enterMobile: 'Mobile Number',
    enterOtp: 'Enter 6-Digit OTP',
    sendOtp: 'Send Verification Code',
    verifyOtp: 'Verify & Continue',
    autoFillDemo: 'Auto-fill Demo Credentials',
    krushiId: 'Kisan ID (PM-KISAN / Krushi ID)',
    apmcLicense: 'APMC License Number',
    govBadgeId: 'Government Department ID',
    authDisclaimer: 'Prototype Security: In demonstration mode, OTP "123456" is accepted.',
    mobileLabel: 'Registered Mobile Number',
    otpCodeLabel: 'OTP sent to',
    demoCredentialsNote: 'Quick test mode enabled',
    resendOtp: 'Resend Code',
    didntReceiveCode: 'Did not receive code?',

    // Farmer Nav
    home: 'Home',
    marketPrices: 'Market Prices',
    addProduce: 'Add Produce',
    bestPlaceToSell: 'Best Place to Sell',
    buyerOffers: 'Buyer Bids',
    farmStore: 'Farm Store',
    salesTracking: 'Sales Tracking',
    aiAssistant: 'AI Advisor',
    profile: 'Profile',
    askKrushiAI: 'Ask AI Advisor',
    netEarnings: 'Net Earnings',

    // Farmer Dashboard
    greeting: 'Welcome back',
    liveMandiTicker: 'Live APMC Feed',
    quickActions: 'Quick Operations',
    listNewHarvest: 'List New Harvest',
    checkAIPrediction: 'AI Price Predictions',
    viewBuyerBids: 'View Direct Buyer Bids',
    weatherAdvisory: 'Weather Advisory',
    weatherRainAlert: 'Loading live satellite & weather forecast...',
    weatherUnavailable: 'Weather data temporarily unavailable',
    rainProbability: 'Rain Probability',
    liveWeather: 'Live Weather (Open-Meteo)',
    weatherAdvisoryHighRain: '{prob}% chance of rain in the next 48 hours — consider covering harvested produce with waterproof tarpaulins.',
    weatherAdvisoryModerateRain: 'Moderate rain probability ({prob}%) in the next 48 hours — plan mandi transit and drying accordingly.',
    weatherAdvisoryDry: 'Dry and clear weather expected ({prob}% rain risk) — ideal conditions for harvesting, drying, and mandi dispatch.',
    trendingCrops: 'Current Market Rates & Trends',
    priceTrend: '7-Day Price Trend',
    estimatedEarnings: 'Estimated Portfolio Value',
    recentListings: 'My Active Produce Lots',
    kisanId: 'Kisan ID',
    acresLabel: 'Acres Cultivated',
    highConfidence: 'High Confidence',
    wheatInsightHeadline: 'Lokwan Wheat rates expected to peak in 12 days (+₹140/qtl).',
    mandiAggregatedNote: 'Aggregated across 18 regional mandis',
    activeBenchmark: 'Active Benchmark',
    liveENAM: 'Live e-NAM',
    peakRateToday: 'Peak Rate Today',
    aboveMSP: 'above MSP',
    puneMandiYard: 'Pune APMC Yard',
    commodity: 'Commodity',
    category: 'Category',
    trend: 'Trend',
    action: 'Action',
    sellThis: 'Sell This Crop',

    // Farmer Market Prices & Calculator
    marketPricesTitle: 'Live Mandi Prices & Net Profit Calculator',
    marketPricesSubtitle: 'Compare real-time wholesale rates across APMC yards with transport deductions.',
    selectCrop: 'Select Crop',
    selectMandi: 'Select Mandi Yard',
    netEarningsCalculator: 'Real Net Profit Calculator',
    adjustQuantity: 'Quantity to Sell (Quintals)',
    grossExpected: 'Gross Realization',
    transportCost: 'Estimated Freight',
    handlingCost: 'APMC Handling & Cess',
    estimatedNetProfit: 'Net In-Hand Payout',
    bookTransport: 'Book Logistics Vehicle',
    alternativeMarkets: 'Compare Other Mandis',
    aiMarketInsight: 'AI Market Intelligence',
    sevenDayMovement: '7-Day Price Movement',
    highGrade: 'Grade A Premium',
    directLogisticsNote: 'Direct farmgate pickup with GPS weighbridge verification.',
    calculateNetPayout: 'Calculate Net Payout',

    // Farmer Add Produce
    addProduceTitle: 'List Your Harvest For Direct Sale',
    addProduceSubtitle: 'Broadcast your harvest to verified bulk buyers and institutional traders.',
    cropDetails: 'Crop Information',
    cropName: 'Crop Name',
    cropVariety: 'Variety',
    variety: 'Variety',
    harvestQuantity: 'Harvest Quantity (Quintals)',
    qualityGrade: 'Quality Grade',
    gradeA: 'Grade A (Export / Premium)',
    gradeB: 'Grade B (Standard Commercial)',
    gradeC: 'Grade C (Processing Grade)',
    expectedPricePerQtl: 'Target Price (₹/Quintal)',
    farmLocation: 'Farm Location / Village',
    storageLocation: 'Storage / Farm Location',
    uploadCropPhoto: 'Upload Crop Photo',
    publishListing: 'Publish Listing to Network',
    listingSuccess: 'Produce Listed Successfully!',
    useCurrentLocation: 'Use GPS Location',
    locatingGps: 'Detecting Location...',
    selectCropType: 'Select Crop Type',
    gradeNote: 'Grading verified via digital APMC quality standards.',
    gradePhotoHint: 'Snap a clear, well-lit photo of your produce spread out — our AI grades it instantly.',
    analyzingGrade: 'Analyzing produce photo...',
    retakePhoto: 'Retake Photo',
    gradeAnalysisConfidence: 'AI Confidence',
    gradeAnalysisError: 'Could not analyze the photo. Please try again.',
    estimatedListingValue: 'Estimated Listing Value',
    activeBuyerBidsWaiting: 'Active Buyer Bids Waiting',
    submitProduce: 'Publish Harvest to Network',

    // Farmer Best Place to Sell
    bestPlaceTitle: 'AI Smart Mandi Recommendation Engine',
    bestPlaceSubtitle: 'Maximized net income calculations accounting for distance, fuel, tolls, and yard cess.',
    highestNetProfit: 'Highest Net Profit',
    distance: 'Distance',
    sellingPrice: 'APMC Spot Rate',
    arbitrageInsight: 'Arbitrage Opportunity',
    initiateSale: 'Select & Sell Here',
    smartLogistics: 'Coordinated Logistics',
    aiArbitrageNote: 'Selling at Pune instead of local market yields ₹14,200 more after all transport costs.',
    viewDirectOffers: 'View Merchant Bids',

    // Farmer Buyer Offers
    buyerOffersTitle: 'Direct Wholesale Buyer Bids (RFQs)',
    buyerOffersSubtitle: 'Review formal purchase offers submitted directly for your listed harvest lots.',
    compareMode: 'Comparison View',
    offeredPrice: 'Offered Rate',
    quantityRequired: 'Order Quantity',
    totalPayout: 'Total Payout Value',
    paymentTerms: 'Settlement Terms',
    acceptOffer: 'Accept Purchase Bid',
    declineOffer: 'Decline',
    offerAccepted: 'Offer Accepted! Digital Gate Pass Generated.',
    offerAcceptedPass: 'Offer Accepted • Gate Pass Issued',
    offerDeclined: 'Offer Declined',
    directRfqBadge: 'Direct Purchase Order',
    directAPMCRFQs: 'Direct APMC RFQs',
    listedQuantity: 'Your Listed Lot',
    expectedBasePrice: 'Your Target Rate',
    instantEnamPayout: 'Direct Bank Settlement (T+0)',
    pickupFromFarm: 'Farmgate Pickup Included',
    buyerVerificationScore: 'Buyer Credit Score: 98% Verified',
    bestMatch: 'Best Value Match',
    fastPickup: 'Same-Day Pickup',
    requiredQuality: 'Required Grade',
    declined: 'Declined',
    decline: 'Decline',
    backToDashboard: 'Back to Dashboard',

    // Warehouse & Storage Discovery
    findStorage: 'Find Storage',
    warehouseDiscovery: 'Warehousing & Cold Storage Discovery',
    warehouseDiscoverySubtitle: 'Explore registered warehouses, silos, and cold storage across Maharashtra with WDRA compliance.',
    nearestWarehouses: '5 Nearest Warehouses by Distance',
    storageDirectoryNote: 'Reference directory of registered warehouses — for live availability, contact the warehouse directly.',
    wdraRegistered: 'WDRA Registered',
    wdraEligible: 'WDRA Registered • e-NWR Eligible',
    coldStorage: 'Cold Storage',
    dryStorage: 'Dry Storage',
    siloStorage: 'Bulk Silo',
    allTypes: 'All Types',
    availableCapacity: 'Available Capacity',
    totalCapacity: 'Total Capacity',
    dailyRatePerQtl: '₹/Quintal/Day',
    selectWarehouse: 'Select Warehouse',
    selectedWarehouse: 'Selected Warehouse',
    changeWarehouse: 'Change Warehouse',
    contactWarehouse: 'Contact Warehouse',
    callWarehouse: 'Call Warehouse',
    selectStorageForProduce: 'Select Storage Location',
    noStorageSelected: 'No warehouse selected yet',
    chooseStorageLocation: 'Choose Registered Warehouse',
    nearestStorageLabel: 'Nearest Storage Hub',
    searchByDistrict: 'Filter by District',
    allDistricts: 'All Districts (Maharashtra)',

    // Store vs Sell Now Comparison
    storeVsSellTitle: 'Store vs. Sell Now Analysis',
    storeVsSellSubtitle: 'Rule-based financial comparison between immediate mandi sale and warehouse holding.',
    sellNowOption: 'Sell Now',
    storeAndSellLaterOption: 'Store & Sell Later',
    recommendedChoice: 'Recommended Option',
    netProceeds: 'Net Proceeds',
    storageCostForDuration: 'Total Storage Rent',
    storageDuration: 'Holding Duration',
    days: 'Days',
    storageEstimateDisclaimer: 'Estimate based on current mandi price outlook and daily storage tariff. Actual payout depends on market arrivals and grade inspection at delivery.',
    sellingNowHigher: 'Selling now provides higher net return',
    storingHigher: 'Holding in storage provides higher net return',
    calculateStorageComparison: 'Calculate Holding ROI',
    exploreWarehouses: 'Explore Warehouses',

    // Farmer Store
    farmStoreTitle: 'Government Certified Agri-Inputs Store',
    farmStoreSubtitle: 'Direct Benefit Transfer (DBT) subsidized seeds, bio-fertilizers, and farm tools.',
    certifiedSeeds: 'Certified Seeds',
    bioFertilizers: 'Bio-Fertilizers & Nutrients',
    equipmentSubsidies: 'Subsidized Tools',
    houseware: 'Houseware & Tools',
    govSubsidyDiscount: 'DBT Subsidy Applied',
    orderNow: 'Order with Subsidy',
    freeDeliveryToPanchayat: 'Direct delivery to Gram Panchayat Center',
    dbtSubsidyLink: 'Linked to PM-KISAN Aadhaar DBT',
    allInputs: 'All Agri Inputs',
    inStock: 'In Stock at Regional Depot',
    orderSuccessMsg: 'Subsidized Order Confirmed!',
    deliveryTokenNote: 'Collection token sent via SMS. Show at Panchayat Center.',
    applySubsidy: 'Claim DBT Subsidy',
    subsidizedPrice: 'Subsidized Price',
    confirmSubsidizedOrder: 'Confirm Subsidized Order',
    confirmOrder: 'Confirm Order',

    // Farmer Sales Tracking
    salesTrackingTitle: 'Sales Receipts, Gate Passes & DBT Settlements',
    salesTrackingSubtitle: 'Official transaction logs, digital e-NAM weighbridge slips, and bank transfer receipts.',
    activeShipments: 'In Transit & Weighbridge',
    completedSales: 'Settled Payments',
    trackMandiGatePass: 'Digital Gate Pass',
    downloadENAMReceipt: 'Download e-NAM Slip',
    paymentStatus: 'Payment Status',
    totalRealizedRevenue: 'Total Settled Income',
    totalHarvestSold: 'Total Harvest Sold',
    activeInTransit: 'Active In Transit',
    shipment: 'Lots',
    activeLotsCount: 'Active Sales',
    directBankDbt: 'Direct Bank Account Deposit (DBT)',
    buyerName: 'Procurement Buyer',
    lotId: 'Batch Lot ID',
    weighbridgeWeight: 'Weighed Quantity',
    settlementSlip: 'Settlement Receipt',
    digitalSettlementSlip: 'Digital e-NAM Settlement Slip',
    taxInvoiceId: 'Tax Invoice & APMC Cess Receipt',
    paidCleared: 'Paid & Cleared',
    inTransit: 'In Transit',
    gatePassNumber: 'Gate Pass Number',
    netSettledAmount: 'Net Settled Payout',
    transactionRef: 'Transaction Ref',
    quantityWeighed: 'Weighbridge Net Qty',
    rateRealized: 'Realized Rate',
    netBankTransfer: 'Net Transfer (DBT)',
    directDBTBeneficiary: 'DBT Beneficiary Account',
    downloadInvoice: 'Download Official Invoice PDF',

    // Farmer AI Prediction
    predictiveEngine: 'Predictive Price Intelligence',
    aiForecasting: 'AI Price Forecasting & Market Advisory',
    aiForecastingSubtitle: 'Machine-learning models trained on historical seasonal cycles, rainfall indices, and trade volumes.',
    updatedToday: 'Model Synced Today',
    risingTrend: 'Upward Trend Forecasted',
    currentPrice: 'Current Spot Price',
    expected: 'Expected in 14 Days',
    certainty: 'Confidence Index',
    modelCalibratedNote: 'Model calibrated against 5 years of historical APMC arrivals and current weather radar.',
    findBestMandis: 'Find Best Selling Markets',
    keyMarketDrivers: 'Key Influencing Market Drivers',
    lowerRainfall: 'Rainfall Deviation in Northern Belts',
    lowerRainfallDesc: 'Late sowing in northern plains is tightening spot availability by 18%.',
    highExportDemand: 'Strong Port Export Demand',
    highExportDemandDesc: 'Elevated export shipments at JNPT Port driving sustained premium rates.',
    askAIAdvisor: 'Ask AI Agricultural Advisor',
    askLiveQuestion: 'Ask any question about crop pricing, weather, or pest management...',
    send: 'Ask',
    aiDisclaimer: 'AI forecasts and calculations are generated demonstration estimates for preview purposes. Actual market conditions and grading may vary.',

    // Farmer Profile
    profileTitle: 'Farmer Profile & Verification',
    kycVerified: 'Aadhaar & Land Records KYC Verified',
    cultivatedLand: 'Registered Farmland',
    cropSpecialization: 'Primary Cultivated Crops',
    sellerScore: 'Verified Seller Rating',
    bankAccountTitle: 'Linked Direct Bank Account (DBT)',
    bankName: 'Bank Name',
    accountNumber: 'Account Number',
    ifscCode: 'IFSC Code',
    directPayoutEnabled: 'Direct e-NAM Payouts Enabled',
    portalShortcuts: 'Quick Integrations',
    governmentSubsidies: 'Active Welfare Schemes',
    pmKisanActive: 'PM-KISAN Status: Active (Installment 18 Processed)',
    cropInsurancePMFBY: 'PMFBY Crop Insurance: Rabi 2026 Policy Active',

    // Merchant Hub
    merchantDashboardTitle: 'Merchant Procurement & Bidding Terminal',
    merchantDashboardSubtitle: 'Direct procurement channel for verified agricultural commodities from local farms.',
    postRequirement: 'Post Procurement Requirement',
    directFarmerLots: 'Available Verified Farmer Lots',
    placePurchaseBid: 'Place Purchase Bid',
    commodityDemandVelocity: 'Commodity Demand Velocity',
    myActiveBids: 'My Active Bids',
    procuredOrders: 'Procured Lots',
    rabiSeason: 'Rabi Season',
    kharifSeason: 'Kharif Season',
    farmerLocation: 'Farm Location',
    bidPlacedSuccess: 'Bid Submitted to Farmer!',
    minOrderQty: 'Min Lot Size',
    targetBuyPrice: 'Target Buy Price',
    destinationWarehouse: 'Destination Warehouse',

    // Government Portal
    govSurveillanceTitle: 'National Agriculture Surveillance Portal',
    surveillanceTitle: 'National Crop Surveillance & Price Intelligence',
    govSurveillanceSubtitle: 'Strategic macro insights, price stabilization metrics, and APMC flow monitoring.',
    surveillanceSubtitle: 'Strategic macro insights, price stabilization metrics, and APMC flow monitoring.',
    regionalHotspots: 'Regional Price Hotspots & Volatility',
    regionalPriceHotspots: 'Regional Price Hotspots & Volatility',
    totalActiveFarmers: 'Total Active Farmers',
    totalTradeVolume: 'Total Trade Volume',
    priceTrendIndex: 'Average Price Trend Index',
    supplyForecast: 'Regional APMC Supply Forecast',
    aiDemandPrediction: 'AI Demand Prediction & Policy Advisory',
    exportReport: 'Export Intelligence Report',
    generateAIInsights: 'Synthesize Policy Brief',
    generateInsights: 'Synthesize Policy Brief',
    farmersRegistry: 'Farmers Registry',
    mspCompliance: 'MSP Compliance Index',
    bufferStocks: 'Strategic Buffer Stocks',
    nationalFeed: 'Real-Time APMC Network',
    highRiskDisparity: 'High Price Volatility',
    moderateVolatility: 'Moderate Price Movement',
    strategicPolicyBrief: 'Strategic Policy Brief',
    generatingPolicyAi: 'Synthesizing macroeconomic models...',

    // Modals & Chat AI
    askAgronomistTitle: 'FarmiGo AI Agricultural Assistant',
    aiChatPlaceholder: 'Ask about crop rates, fertilizer schedules, or market timing...',
    sendQuestion: 'Send Question',
    transportBookingTitle: 'Book Dedicated Freight Vehicle',
    vehicleType: 'Select Vehicle Type',
    pickupSlot: 'Preferred Pickup Slot',
    transportConfirmed: 'Transport Booked Successfully!',
    bookingId: 'Logistics Booking ID',
    postProcurementTitle: 'Post Procurement Requirement',
    requirementSuccess: 'Purchase Requirement Broadcasted!',
    languageSelectTitle: 'Choose Your Preferred Language',
    languageSelectSubtitle: 'Select a language for the interface',

    // FPO Feature
    fpoNavLabel: 'FPO Group',
    fpoHubTitle: 'FPO Producer Groups',
    fpoHubSubtitle: 'Join a Farmer Producer Organization to pool your harvest with nearby farmers for better bargaining power.',
    fpoJoinButton: 'Join FPO',
    fpoJoinedBadge: 'Joined',
    fpoMemberCount: 'Members',
    fpoOfficeBearer: 'Office Bearer',
    fpoPrimaryCrops: 'Primary Crops',
    fpoAggregationToggle: 'List as part of my FPO group',
    fpoAggregationHint: 'Pooling with other FPO members can attract bulk buyers looking for consistent volume.',
    fpoPooledLotBadge: 'FPO Pooled Lot',
    fpoPooledFrom: 'farmers pooled',
    fpoDashboardTitle: 'FPO Office Bearer Summary',
    fpoTotalPooled: 'Total Pooled This Season',
    fpoNoFpoJoined: "You haven't joined an FPO yet. Browse groups below to join one.",
    fpoSearchByDistrict: 'Search by District',

    // Dispute / Grievance
    raiseIssueButton: 'Raise an Issue',
    disputeCenterTitle: 'Dispute & Grievance Center',
    disputeReasonLabel: 'Reason',
    disputeReasonQuality: 'Quality Mismatch',
    disputeReasonPayment: 'Payment Delay',
    disputeReasonQuantity: 'Quantity Mismatch',
    disputeReasonOther: 'Other',
    disputeNoteLabel: 'Describe the issue',
    disputeSubmit: 'Submit Ticket',
    disputeStatusOpen: 'Open',
    disputeStatusReview: 'Under Review',
    disputeStatusResolved: 'Resolved',
    disputeSuccessMessage: 'Your dispute ticket has been raised. Our team will review it shortly.',
    noDisputesYet: 'No disputes raised yet.',
    myDisputes: 'My Disputes',

    // Verification & Quality
    verifiedBuyerBadge: 'GST Verified',
    unverifiedBuyerBadge: 'Unverified',
    gstVerifiedLabel: 'Verified via GST & phone confirmation',
    qualityTrackRecord: 'Quality Track Record',
    rateQualityReceived: 'Rate Quality Received',
    qualityRatingSubmitted: 'Thanks! Your quality rating has been recorded.',
    markAsPaidButton: 'Confirm Payment Received',
    paymentConfirmedMessage: 'Payment status updated to Paid.',

    // Forecast transparency
    statisticalBaselineBadge: 'Statistical Baseline (Rule-Based)',
    statisticalBaselineExplanation: 'This is a deterministic trend-line estimate calculated from recent price movement (moving average + linear trend) — not AI-generated. Shown alongside the LLM estimate for comparison.',
    arrivalDataUnavailable: 'Arrival data not reported',
  },

  hi: {
    // Common & Global
    appName: 'कृषि मार्केट',
    appTagline: 'एकीकृत कृषि बाजार नेटवर्क',
    switchRole: 'भूमिका बदलें',
    selectLanguage: 'भाषा चुनें',
    logout: 'लॉग आउट',
    login: 'लॉग इन',
    demoModeNotice: 'डेमो मोड: नमूना क्रेडेंशियल्स के साथ तुरंत साइन इन करने के लिए ऑटो-फिल पर क्लिक करें',
    demoModeBadge: 'नमूना प्रोफ़ाइल सक्रिय',
    portalBadge: 'डिजिटल कृषि नेटवर्क',
    verified: 'सत्यापित',
    verifiedFarmer: 'सत्यापित किसान',
    licensedTrader: 'लाइसेंस प्राप्त APMC व्यापारी',
    nationalSurveillance: 'राष्ट्रीय कृषि निगरानी',
    digitalAgriOS: 'राष्ट्रीय e-NAM से कनेक्टेड',
    search: 'मंडी या फसल खोजें...',
    filter: 'फ़िल्टर',
    all: 'सभी',
    viewAll: 'सभी देखें',
    back: 'पीछे',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    submit: 'जमा करें',
    save: 'सहेजें',
    status: 'स्थिति',
    actions: 'कार्रवाई',
    details: 'विवरण',
    date: 'दिनांक',
    price: 'मूल्य',
    quantity: 'मात्रा',
    total: 'कुल',
    loading: 'लोड हो रहा है...',
    success: 'सफलता',
    error: 'त्रुटि',
    close: 'बंद करें',
    quintal: 'क्विंटल',
    ton: 'टन',
    perQuintal: '₹/क्विंटल',
    perKg: '₹/किलो',
    updatedJustNow: 'अभी अपडेट हुआ',
    updatedMinsAgo: 'मिनट पहले',
    phone: 'फ़ोन नंबर',
    prototypeData: 'प्रोटोटाइप डेटा',
    aiEstimate: 'AI अनुमान',
    aiAssistedEstimateBadge: 'AI-सहायक अनुमान (LLM-आधारित)',
    aiAssistedEstimateExplanation: 'यह अनुमान सामान्य बाजार प्रवृत्तियों पर आधारित एक AI लैंग्वेज मॉडल द्वारा उत्पन्न किया गया है, न कि ऐतिहासिक मूल्य डेटा पर प्रशिक्षित सांख्यिकीय मॉडल द्वारा। ऐतिहासिक अगमार्कनेट डेटा पर प्रशिक्षित व सटीकता-ट्रैक किया गया बैकटेस्टेड पूर्वानुमान मॉडल (LightGBM) भविष्य के संस्करण के लिए नियोजित है।',
    aiAssistedEstimateInfoTitle: 'पूर्वानुमान कार्यप्रणाली और पारदर्शिता',
    referencePriceData: 'संदर्भ मूल्य डेटा',
    simulatedData: 'सिम्युलेटेड डेटा',
    simulatedBookingNote: 'सूचना: लॉजिस्टिक्स और ड्राइवर आवंटन विवरण प्रोटोटाइप पूर्वावलोकन हेतु सिमुलेटेड हैं।',
    distanceToMandi: 'मंडी से दूरी',
    calculatedDistance: 'गणना की गई दूरी',
    liveData: 'लाइव मंडी डेटा',

    // Roles & Selection Screen
    roleSelectionTitle: 'अपना पोर्टल चुनें',
    roleSelectionSubtitle: 'खेत, थोक APMC व्यापारियों और नीति निर्माताओं के बीच निर्बाध सीधा संपर्क।',
    farmer: 'किसान',
    farmerDesc: 'वास्तविक समय में मंडी भाव, AI मूल्य पूर्वानुमान, परिवहन के बाद शुद्ध लाभ की गणना करें और सीधे खरीदारों को बेचें।',
    merchant: 'व्यापारी / आढ़ती',
    merchantDesc: 'सत्यापित किसान उपज के लॉट देखें, थोक खरीद आवश्यकताएं पोस्ट करें और इलेक्ट्रॉनिक व्यापार अनुबंध निष्पादित करें।',
    government: 'सरकारी अधिकारी',
    governmentDesc: 'क्षेत्रीय कृषि आपूर्ति की निगरानी करें, मूल्य असमानता हॉटस्पॉट पहचानें और AI व्यापक नीति अंतर्दृष्टि का उपयोग करें।',
    continueAsFarmer: 'किसान पोर्टल में प्रवेश करें',
    continueAsMerchant: 'व्यापारी पोर्टल में प्रवेश करें',
    continueAsGovernment: 'निगरानी पोर्टल में प्रवेश करें',
    producerBadge: 'उत्पादक',
    procurementBadge: 'खरीद',
    surveillanceBadge: 'निगरानी व नीति',
    apmcLinked: 'e-NAM एकीकृत',
    krushiAiActive: 'AI इंजन सक्रिय',
    multiStateSurveillance: 'बहु-राज्य कवरेज',

    // Auth Modal
    loginTitle: 'सुरक्षित साइन-इन',
    loginSubtitle: 'अपना पंजीकृत मोबाइल नंबर और आईडी दर्ज करें',
    enterMobile: 'मोबाइल नंबर',
    enterOtp: '6-अंकीय OTP दर्ज करें',
    sendOtp: 'सत्यापन कोड भेजें',
    verifyOtp: 'सत्यापित करें और जारी रखें',
    autoFillDemo: 'डेमो क्रेडेंशियल स्वतः भरें',
    krushiId: 'किसान आईडी (PM-KISAN / कृषि आईडी)',
    apmcLicense: 'APMC लाइसेंस नंबर',
    govBadgeId: 'सरकारी विभाग आईडी',
    authDisclaimer: 'सुरक्षा सूचना: प्रदर्शन मोड में OTP "123456" मान्य है।',
    mobileLabel: 'पंजीकृत मोबाइल नंबर',
    otpCodeLabel: 'OTP भेजा गया',
    demoCredentialsNote: 'त्वरित परीक्षण मोड सक्रिय',
    resendOtp: 'पुनः कोड भेजें',
    didntReceiveCode: 'कोड नहीं मिला?',

    // Farmer Nav
    home: 'होम',
    marketPrices: 'मंडी भाव',
    addProduce: 'फसल जोड़ें',
    bestPlaceToSell: 'बेचने का उत्तम स्थान',
    buyerOffers: 'खरीदार बोलियां',
    farmStore: 'कृषि स्टोर',
    salesTracking: 'बिक्री ट्रैकिंग',
    aiAssistant: 'AI सलाहकार',
    profile: 'प्रोफ़ाइल',
    askKrushiAI: 'कृषि AI से पूछें',
    netEarnings: 'शुद्ध कमाई',

    // Farmer Dashboard
    greeting: 'वापसी पर स्वागत है',
    liveMandiTicker: 'लाइव APMC फीड',
    quickActions: 'त्वरित कार्य',
    listNewHarvest: 'नई फसल सूची बनाएं',
    checkAIPrediction: 'AI मूल्य पूर्वानुमान',
    viewBuyerBids: 'खरीदार बोलियां देखें',
    weatherAdvisory: 'मौसम सलाह',
    weatherRainAlert: 'सजीव उपग्रह व मौसम पूर्वानुमान लोड हो रहा है...',
    weatherUnavailable: 'मौसम डेटा अस्थायी रूप से अनुपलब्ध है',
    rainProbability: 'बारिश की संभावना',
    liveWeather: 'सजीव मौसम (Open-Meteo)',
    weatherAdvisoryHighRain: 'अगले 48 घंटों में {prob}% बारिश की संभावना — कटी हुई उपज को तिरपाल से ढकने पर विचार करें।',
    weatherAdvisoryModerateRain: 'अगले 48 घंटों में मध्यम बारिश ({prob}%) की संभावना — मंडी परिवहन और सुखाने की योजना तदनुसार बनाएं।',
    weatherAdvisoryDry: 'शुष्क और साफ मौसम की संभावना ({prob}% बारिश जोखिम) — फसल कटाई, सुखाने और मंडी भेजने के लिए अनुकूल परिस्थितियां।',
    trendingCrops: 'वर्तमान बाजार भाव और रुझान',
    priceTrend: '7-दिवसीय मूल्य रुझान',
    estimatedEarnings: 'अनुमानित फसल मूल्य',
    recentListings: 'मेरी सक्रिय फसलें',
    kisanId: 'किसान आईडी',
    acresLabel: 'खेती का रकबा',
    highConfidence: 'उच्च विश्वसनीयता',
    wheatInsightHeadline: 'लोकवन गेहूं के भाव 12 दिनों में उच्चतम स्तर (+₹140/क्विंटल) पर पहुंचने की उम्मीद।',
    mandiAggregatedNote: '18 क्षेत्रीय मंडियों से संकलित डेटा',
    activeBenchmark: 'सक्रिय बेंचमार्क',
    liveENAM: 'लाइव e-NAM',
    peakRateToday: 'आज का उच्चतम भाव',
    aboveMSP: 'MSP से अधिक',
    puneMandiYard: 'पुणे APMC यार्ड',
    commodity: 'फसल / जिंस',
    category: 'श्रेणी',
    trend: 'रुझान',
    action: 'कार्रवाई',
    sellThis: 'यह फसल बेचें',

    // Farmer Market Prices & Calculator
    marketPricesTitle: 'लाइव मंडी भाव व शुद्ध लाभ कैलकुलेटर',
    marketPricesSubtitle: 'परिवहन और मंडी शुल्क घटाकर APMC यार्डों के वास्तविक दरों की तुलना करें।',
    selectCrop: 'फसल चुनें',
    selectMandi: 'मंडी यार्ड चुनें',
    netEarningsCalculator: 'वास्तविक शुद्ध लाभ कैलकुलेटर',
    adjustQuantity: 'बेचने की मात्रा (क्विंटल)',
    grossExpected: 'सकल प्राप्ति',
    transportCost: 'अनुमानित माल ढुलाई',
    handlingCost: 'APMC हैंडलिंग व उपकर',
    estimatedNetProfit: 'शुद्ध हाथ में आने वाली राशि',
    bookTransport: 'परिवहन वाहन बुक करें',
    alternativeMarkets: 'अन्य मंडियों की तुलना करें',
    aiMarketInsight: 'AI बाजार अंतर्दृष्टि',
    sevenDayMovement: '7-दिवसीय मूल्य उतार-चढ़ाव',
    highGrade: 'ग्रेड A प्रीमियम',
    directLogisticsNote: 'जीपीएस वे-ब्रिज सत्यापन के साथ खेत से सीधे उठाव।',
    calculateNetPayout: 'शुद्ध भुगतान की गणना करें',

    // Farmer Add Produce
    addProduceTitle: 'सीधी बिक्री के लिए अपनी फसल सूचीबद्ध करें',
    addProduceSubtitle: 'सत्यापित थोक खरीदारों और संस्थागत व्यापारियों तक अपनी फसल पहुंचाएं।',
    cropDetails: 'फसल विवरण',
    cropName: 'फसल का नाम',
    cropVariety: 'किस्म',
    variety: 'किस्म',
    harvestQuantity: 'फसल की मात्रा (क्विंटल)',
    qualityGrade: 'गुणवत्ता ग्रेड',
    gradeA: 'ग्रेड A (निर्यात / प्रीमियम)',
    gradeB: 'ग्रेड B (मानक वाणिज्यिक)',
    gradeC: 'ग्रेड C (प्रसंस्करण ग्रेड)',
    expectedPricePerQtl: 'अपेक्षित मूल्य (₹/क्विंटल)',
    farmLocation: 'खेत का स्थान / गांव',
    storageLocation: 'भंडारण / खेत का स्थान',
    uploadCropPhoto: 'फसल की फोटो अपलोड करें',
    publishListing: 'नेटवर्क पर सूची प्रकाशित करें',
    listingSuccess: 'फसल सफलतापूर्वक सूचीबद्ध हो गई!',
    useCurrentLocation: 'GPS स्थान का उपयोग करें',
    locatingGps: 'स्थान खोजा जा रहा है...',
    selectCropType: 'फसल का प्रकार चुनें',
    gradeNote: 'डिजिटल APMC गुणवत्ता मानकों के अनुसार ग्रेडिंग सत्यापित।',
    gradePhotoHint: 'अपने माल को फैलाकर, अच्छी रोशनी में एक स्पष्ट फोटो लें — हमारा AI तुरंत ग्रेड तय करेगा।',
    analyzingGrade: 'फोटो का विश्लेषण किया जा रहा है...',
    retakePhoto: 'फोटो दोबारा लें',
    gradeAnalysisConfidence: 'AI विश्वास स्तर',
    gradeAnalysisError: 'फोटो का विश्लेषण नहीं हो सका। कृपया पुनः प्रयास करें।',
    estimatedListingValue: 'अनुमानित कुल मूल्य',
    activeBuyerBidsWaiting: 'सक्रिय खरीदार बोलियां उपलब्ध',
    submitProduce: 'फसल नेटवर्क पर प्रकाशित करें',

    // Farmer Best Place to Sell
    bestPlaceTitle: 'AI स्मार्ट मंडी अनुशंसा इंजन',
    bestPlaceSubtitle: 'दूरी, ईंधन, टोल और मंडी उपकर को ध्यान में रखकर अधिकतम शुद्ध आय की गणना।',
    highestNetProfit: 'उच्चतम शुद्ध लाभ',
    distance: 'दूरी',
    sellingPrice: 'APMC स्पॉट दर',
    arbitrageInsight: 'मध्यस्थता लाभ का अवसर',
    initiateSale: 'चुनें और यहां बेचें',
    smartLogistics: 'समन्वित रसद व्यवस्था',
    aiArbitrageNote: 'स्थानीय बाजार के बजाय पुणे में बेचने पर सभी परिवहन खर्चों के बाद ₹14,200 अधिक मिलते हैं।',
    viewDirectOffers: 'व्यापारी बोलियां देखें',

    // Farmer Buyer Offers
    buyerOffersTitle: 'सीधे थोक खरीदार बोलियां (RFQs)',
    buyerOffersSubtitle: 'आपकी सूचीबद्ध फसल के लिए सीधे प्राप्त औपचारिक खरीद प्रस्तावों की समीक्षा करें।',
    compareMode: 'तुलना दृश्य',
    offeredPrice: 'प्रस्तावित दर',
    quantityRequired: 'मांग की मात्रा',
    totalPayout: 'कुल भुगतान मूल्य',
    paymentTerms: 'भुगतान की शर्तें',
    acceptOffer: 'खरीद प्रस्ताव स्वीकार करें',
    declineOffer: 'अस्वीकार करें',
    offerAccepted: 'प्रस्ताव स्वीकृत! डिजिटल गेट पास जारी किया गया।',
    offerAcceptedPass: 'प्रस्ताव स्वीकृत • गेट पास जारी',
    offerDeclined: 'प्रस्ताव अस्वीकार कर दिया गया',
    directRfqBadge: 'प्रत्यक्ष खरीद आदेश',
    directAPMCRFQs: 'प्रत्यक्ष APMC RFQs',
    listedQuantity: 'आपकी सूचीबद्ध उपज',
    expectedBasePrice: 'आपकी लक्षित दर',
    instantEnamPayout: 'सीधा बैंक निपटान (T+0)',
    pickupFromFarm: 'खेत से पिकअप शामिल',
    buyerVerificationScore: 'खरीदार विश्वसनीयता स्कोर: 98% सत्यापित',
    bestMatch: 'सर्वोत्तम मूल्य मिलान',
    fastPickup: 'उसी दिन पिकअप',
    requiredQuality: 'अपेक्षित ग्रेड',
    declined: 'अस्वीकृत',
    decline: 'अस्वीकार करें',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',

    // Warehouse & Storage Discovery
    findStorage: 'गोदाम व शीतगृह खोजें',
    warehouseDiscovery: 'गोदाम व शीतगृह डायरेक्टरी',
    warehouseDiscoverySubtitle: 'महाराष्ट्र भर में WDRA पंजीकृत गोदाम, साइलो और कोल्ड स्टोरेज की दूरी व शुल्क सहित खोज।',
    nearestWarehouses: 'दूरी के अनुसार 5 निकटतम गोदाम',
    storageDirectoryNote: 'पंजीकृत गोदामों की संदर्भ निर्देशिका — वास्तविक उपलब्धता के लिए सीधे गोदाम से संपर्क करें।',
    wdraRegistered: 'WDRA पंजीकृत',
    wdraEligible: 'WDRA पंजीकृत • e-NWR पात्र',
    coldStorage: 'शीतगृह (कोल्ड स्टोरेज)',
    dryStorage: 'शुष्क गोदाम (Dry Godown)',
    siloStorage: 'अनाज साइलो',
    allTypes: 'सभी प्रकार',
    availableCapacity: 'उपलब्ध क्षमता',
    totalCapacity: 'कुल क्षमता',
    dailyRatePerQtl: '₹/क्विंटल/दिन',
    selectWarehouse: 'गोदाम चुनें',
    selectedWarehouse: 'चयनित गोदाम',
    changeWarehouse: 'गोदाम बदलें',
    contactWarehouse: 'गोदाम से संपर्क करें',
    callWarehouse: 'कॉल करें',
    selectStorageForProduce: 'भंडारण स्थान चुनें',
    noStorageSelected: 'अभी कोई गोदाम नहीं चुना गया',
    chooseStorageLocation: 'पंजीकृत गोदाम चुनें',
    nearestStorageLabel: 'निकटतम भंडारण केंद्र',
    searchByDistrict: 'जिले के अनुसार खोजें',
    allDistricts: 'सभी जिले (महाराष्ट्र)',

    // Store vs Sell Now Comparison
    storeVsSellTitle: 'अभी बेचें बनाम गोदाम में रखें विश्लेषण',
    storeVsSellSubtitle: 'तुरंत मंडी बिक्री और गोदाम में रखकर बाद में बेचने के बीच नियम-आधारित वित्तीय तुलना।',
    sellNowOption: 'अभी बेचें',
    storeAndSellLaterOption: 'गोदाम में रखकर बाद में बेचें',
    recommendedChoice: 'सुझाया गया विकल्प',
    netProceeds: 'शुद्ध आय',
    storageCostForDuration: 'कुल भंडारण शुल्क',
    storageDuration: 'भंडारण अवधि',
    days: 'दिन',
    storageEstimateDisclaimer: 'यह अनुमान वर्तमान मंडी मूल्य और दैनिक भंडारण दर पर आधारित है। वास्तविक लाभ मंडी आवक और गुणवत्ता जांच पर निर्भर करेगा।',
    sellingNowHigher: 'तुरंत बेचना अधिक शुद्ध लाभ देगा',
    storingHigher: 'गोदाम में रखना अधिक शुद्ध लाभ देगा',
    calculateStorageComparison: 'भंडारण लाभ की गणना करें',
    exploreWarehouses: 'गोदाम देखें',

    // Farmer Store
    farmStoreTitle: 'सरकारी प्रमाणित कृषि-इनपुट स्टोर',
    farmStoreSubtitle: 'प्रत्यक्ष लाभ अंतरण (DBT) रियायती बीज, जैविक खाद और कृषि उपकरण।',
    certifiedSeeds: 'प्रमाणित बीज',
    bioFertilizers: 'जैविक खाद एवं पोषक तत्व',
    equipmentSubsidies: 'रियायती उपकरण',
    houseware: 'घरेलू सामग्री व उपकरण',
    govSubsidyDiscount: 'DBT सब्सिडी लागू',
    orderNow: 'सब्सिडी के साथ ऑर्डर करें',
    freeDeliveryToPanchayat: 'ग्राम पंचायत केंद्र तक सीधी डिलीवरी',
    dbtSubsidyLink: 'PM-KISAN आधार DBT से जुड़ा',
    allInputs: 'सभी कृषि सामग्री',
    inStock: 'क्षेत्रीय डिपो में उपलब्ध',
    orderSuccessMsg: 'रियायती ऑर्डर की पुष्टि हुई!',
    deliveryTokenNote: 'कलेक्शन टोकन एसएमएस द्वारा भेजा गया। पंचायत केंद्र पर दिखाएं।',
    applySubsidy: 'DBT सब्सिडी प्राप्त करें',
    subsidizedPrice: 'रियायती मूल्य',
    confirmSubsidizedOrder: 'रियायती ऑर्डर की पुष्टि करें',
    confirmOrder: 'ऑर्डर की पुष्टि करें',

    // Farmer Sales Tracking
    salesTrackingTitle: 'बिक्री रसीदें, गेट पास व DBT भुगतान',
    salesTrackingSubtitle: 'आधिकारिक लेनदेन लॉग, डिजिटल e-NAM वे-ब्रिज पर्चियां और बैंक ट्रांसफर रसीदें।',
    activeShipments: 'पारगमन व वे-ब्रिज में',
    completedSales: 'निपटान किए गए भुगतान',
    trackMandiGatePass: 'डिजिटल गेट पास',
    downloadENAMReceipt: 'e-NAM पर्ची डाउनलोड करें',
    paymentStatus: 'भुगतान स्थिति',
    totalRealizedRevenue: 'कुल प्राप्त आय',
    totalHarvestSold: 'कुल बेची गई उपज',
    activeInTransit: 'रास्ते में सक्रिय',
    shipment: 'लॉट',
    activeLotsCount: 'सक्रिय बिक्री',
    directBankDbt: 'सीधे बैंक खाते में जमा (DBT)',
    buyerName: 'खरीददार व्यापारी',
    lotId: 'बैच लॉट आईडी',
    weighbridgeWeight: 'तौला गया वजन',
    settlementSlip: 'निपटान रसीद',
    digitalSettlementSlip: 'डिजिटल e-NAM निपटान पर्ची',
    taxInvoiceId: 'टैक्स इनवॉइस एवं APMC उपकर रसीद',
    paidCleared: 'भुगतान पूर्ण',
    inTransit: 'पारगमन में',
    gatePassNumber: 'गेट पास नंबर',
    netSettledAmount: 'शुद्ध भुगतान राशि',
    transactionRef: 'लेनदेन संदर्भ',
    quantityWeighed: 'वे-ब्रिज शुद्ध मात्रा',
    rateRealized: 'प्राप्त दर',
    netBankTransfer: 'शुद्ध बैंक ट्रांसफर (DBT)',
    directDBTBeneficiary: 'DBT लाभार्थी खाता',
    downloadInvoice: 'आधिकारिक चालान पीडीएफ डाउनलोड करें',

    // Farmer AI Prediction
    predictiveEngine: 'मूल्य पूर्वानुमान इंजन',
    aiForecasting: 'AI मूल्य पूर्वानुमान व बाजार सलाह',
    aiForecastingSubtitle: 'ऐतिहासिक मौसमी चक्रों, वर्षा सूचकांकों और व्यापार मात्रा पर प्रशिक्षित मशीन-लर्निंग मॉडल।',
    updatedToday: 'आज का मॉडल सिंक हुआ',
    risingTrend: 'तेजी का पूर्वानुमान',
    currentPrice: 'वर्तमान हाजिर भाव',
    expected: '14 दिनों में संभावित',
    certainty: 'विश्वसनीयता सूचकांक',
    modelCalibratedNote: 'मॉडल को 5 वर्षों के ऐतिहासिक APMC आवक और वर्तमान मौसम रडार के अनुसार कैलिब्रेट किया गया है।',
    findBestMandis: 'सर्वोत्तम बिक्री मंडियां खोजें',
    keyMarketDrivers: 'प्रमुख प्रभावशाली कारक',
    lowerRainfall: 'उत्तरी क्षेत्रों में कम वर्षा',
    lowerRainfallDesc: 'उत्तरी मैदानों में देर से बुवाई के कारण हाजिर उपलब्धता 18% तक कम हो रही है।',
    highExportDemand: 'मजबूत बंदरगाह निर्यात मांग',
    highExportDemandDesc: 'JNPT बंदरगाह पर निर्यात शिपमेंट में वृद्धि से कीमतों को लगातार समर्थन मिल रहा है।',
    askAIAdvisor: 'कृषि AI सलाहकार से पूछें',
    askLiveQuestion: 'फसल के दाम, मौसम या कीट प्रबंधन के बारे में कोई भी प्रश्न पूछें...',
    send: 'पूछें',
    aiDisclaimer: 'AI पूर्वानुमान और विश्लेषण प्रोटोटाइप प्रदर्शन हेतु अनुमानित हैं। वास्तविक मंडी दरें और ग्रेडिंग भिन्न हो सकती हैं।',

    // Farmer Profile
    profileTitle: 'किसान प्रोफ़ाइल एवं सत्यापन',
    kycVerified: 'आधार एवं भूमि अभिलेख KYC सत्यापित',
    cultivatedLand: 'पंजीकृत कृषि भूमि',
    cropSpecialization: 'मुख्य फसलें',
    sellerScore: 'सत्यापित विक्रेता रेटिंग',
    bankAccountTitle: 'सीधा बैंक खाता (DBT)',
    bankName: 'बैंक का नाम',
    accountNumber: 'खाता संख्या',
    ifscCode: 'IFSC कोड',
    directPayoutEnabled: 'सीधे e-NAM भुगतान सक्षम',
    portalShortcuts: 'त्वरित सेवाएं',
    governmentSubsidies: 'सक्रिय कल्याणकारी योजनाएं',
    pmKisanActive: 'PM-KISAN स्थिति: सक्रिय (18वीं किस्त संसाधित)',
    cropInsurancePMFBY: 'PMFBY फसल बीमा: रबी 2026 पॉलिसी सक्रिय',

    // Merchant Hub
    merchantDashboardTitle: 'व्यापारी खरीद व बोली टर्मिनल',
    merchantDashboardSubtitle: 'स्थानीय खेतों से सत्यापित कृषि जिंसों के लिए सीधा खरीद चैनल।',
    postRequirement: 'खरीद आवश्यकता पोस्ट करें',
    directFarmerLots: 'उपलब्ध सत्यापित किसान फसलें',
    placePurchaseBid: 'खरीद बोली लगाएं',
    commodityDemandVelocity: 'जिंस मांग गति',
    myActiveBids: 'मेरी सक्रिय बोलियां',
    procuredOrders: 'खरीदी गई फसलें',
    rabiSeason: 'रबी सीजन',
    kharifSeason: 'खरीफ सीजन',
    farmerLocation: 'खेत का स्थान',
    bidPlacedSuccess: 'किसान को बोली प्रस्तुत कर दी गई!',
    minOrderQty: 'न्यूनतम लॉट आकार',
    targetBuyPrice: 'लक्षित खरीद मूल्य',
    destinationWarehouse: 'गंतव्य गोदाम',

    // Government Portal
    govSurveillanceTitle: 'राष्ट्रीय कृषि निगरानी पोर्टल',
    surveillanceTitle: 'राष्ट्रीय फसल निगरानी व मूल्य खुफिया तंत्र',
    govSurveillanceSubtitle: 'रणनीतिक व्यापक अंतर्दृष्टि, मूल्य स्थिरीकरण मीट्रिक और APMC प्रवाह निगरानी।',
    surveillanceSubtitle: 'रणनीतिक व्यापक अंतर्दृष्टि, मूल्य स्थिरीकरण मीट्रिक और APMC प्रवाह निगरानी।',
    regionalHotspots: 'क्षेत्रीय मूल्य हॉटस्पॉट व अस्थिरता',
    regionalPriceHotspots: 'क्षेत्रीय मूल्य हॉटस्पॉट व अस्थिरता',
    totalActiveFarmers: 'कुल सक्रिय किसान',
    totalTradeVolume: 'कुल व्यापार मात्रा',
    priceTrendIndex: 'औसत मूल्य रुझान सूचकांक',
    supplyForecast: 'क्षेत्रीय APMC आपूर्ति पूर्वानुमान',
    aiDemandPrediction: 'AI मांग पूर्वानुमान व नीति सलाह',
    exportReport: 'खुफिया रिपोर्ट निर्यात करें',
    generateAIInsights: 'नीति संक्षिप्त विवरण तैयार करें',
    generateInsights: 'नीति संक्षिप्त विवरण तैयार करें',
    farmersRegistry: 'किसान रजिस्ट्री',
    mspCompliance: 'MSP अनुपालन सूचकांक',
    bufferStocks: 'रणनीतिक बफर स्टॉक',
    nationalFeed: 'लाइव APMC नेटवर्क',
    highRiskDisparity: 'उच्च मूल्य अस्थिरता',
    moderateVolatility: 'मध्यम मूल्य परिवर्तन',
    strategicPolicyBrief: 'रणनीतिक नीति संक्षिप्त विवरण',
    generatingPolicyAi: 'मैक्रोइकोनॉमिक मॉडल संश्लेषित किए जा रहे हैं...',

    // Modals & Chat AI
    askAgronomistTitle: 'कृषि AI कृषि विशेषज्ञ',
    aiChatPlaceholder: 'फसल दरों, खाद कार्यक्रम या बाजार समय के बारे में पूछें...',
    sendQuestion: 'प्रश्न भेजें',
    transportBookingTitle: 'माल वाहक वाहन बुक करें',
    vehicleType: 'वाहन का प्रकार चुनें',
    pickupSlot: 'पसंदीदा पिकअप समय',
    transportConfirmed: 'परिवहन सफलतापूर्वक बुक हुआ!',
    bookingId: 'लॉजिस्टिक्स बुकिंग आईडी',
    postProcurementTitle: 'खरीद आवश्यकता पोस्ट करें',
    requirementSuccess: 'खरीद आवश्यकता प्रसारित कर दी गई!',
    languageSelectTitle: 'अपनी पसंदीदा भाषा चुनें',
    languageSelectSubtitle: 'इंटरफ़ेस के लिए भाषा का चयन करें',

    // FPO Feature
    fpoNavLabel: 'FPO समूह',
    fpoHubTitle: 'FPO उत्पादक समूह',
    fpoHubSubtitle: 'बेहतर सौदेबाजी के लिए पास के किसानों के साथ अपनी उपज जोड़ने हेतु किसान उत्पादक संगठन में शामिल हों।',
    fpoJoinButton: 'FPO में शामिल हों',
    fpoJoinedBadge: 'शामिल',
    fpoMemberCount: 'सदस्य',
    fpoOfficeBearer: 'पदाधिकारी',
    fpoPrimaryCrops: 'मुख्य फसलें',
    fpoAggregationToggle: 'मेरे FPO समूह के भाग के रूप में सूचीबद्ध करें',
    fpoAggregationHint: 'अन्य FPO सदस्यों के साथ मिलकर बेचने से बड़े खरीदारों को आकर्षित किया जा सकता है।',
    fpoPooledLotBadge: 'FPO सामूहिक लॉट',
    fpoPooledFrom: 'किसान एकत्रित',
    fpoDashboardTitle: 'FPO पदाधिकारी सारांश',
    fpoTotalPooled: 'इस मौसम में कुल एकत्रित',
    fpoNoFpoJoined: 'आप अभी तक किसी FPO में शामिल नहीं हुए हैं। शामिल होने के लिए नीचे समूह देखें।',
    fpoSearchByDistrict: 'जिले के अनुसार खोजें',

    // Dispute / Grievance
    raiseIssueButton: 'शिकायत दर्ज करें',
    disputeCenterTitle: 'शिकायत निवारण केंद्र',
    disputeReasonLabel: 'कारण',
    disputeReasonQuality: 'गुणवत्ता में अंतर',
    disputeReasonPayment: 'भुगतान में देरी',
    disputeReasonQuantity: 'मात्रा में अंतर',
    disputeReasonOther: 'अन्य',
    disputeNoteLabel: 'समस्या का विवरण दें',
    disputeSubmit: 'टिकट सबमिट करें',
    disputeStatusOpen: 'खुला',
    disputeStatusReview: 'समीक्षा में',
    disputeStatusResolved: 'हल हो गया',
    disputeSuccessMessage: 'आपकी शिकायत दर्ज कर ली गई है। हमारी टीम जल्द ही समीक्षा करेगी।',
    noDisputesYet: 'अभी तक कोई शिकायत दर्ज नहीं हुई।',
    myDisputes: 'मेरी शिकायतें',

    // Verification & Quality
    verifiedBuyerBadge: 'GST सत्यापित',
    unverifiedBuyerBadge: 'असत्यापित',
    gstVerifiedLabel: 'GST और फ़ोन पुष्टि द्वारा सत्यापित',
    qualityTrackRecord: 'गुणवत्ता ट्रैक रिकॉर्ड',
    rateQualityReceived: 'प्राप्त गुणवत्ता को रेट करें',
    qualityRatingSubmitted: 'धन्यवाद! आपकी गुणवत्ता रेटिंग दर्ज कर ली गई है।',
    markAsPaidButton: 'भुगतान प्राप्ति की पुष्टि करें',
    paymentConfirmedMessage: 'भुगतान की स्थिति "भुगतान हो गया" में अपडेट की गई।',

    // Forecast transparency
    statisticalBaselineBadge: 'सांख्यिकीय आधार रेखा (नियम-आधारित)',
    statisticalBaselineExplanation: 'यह हाल की कीमत में बदलाव (मूविंग एवरेज + रेखीय प्रवृत्ति) से गणना किया गया एक निश्चित अनुमान है — यह AI-जनित नहीं है। तुलना के लिए LLM अनुमान के साथ दिखाया गया है।',
    arrivalDataUnavailable: 'आवक डेटा रिपोर्ट नहीं किया गया',
  },

  mr: {
    // Common & Global
    appName: 'कृषी मार्केट',
    appTagline: 'एकीकृत कृषी बाजार नेटवर्क',
    switchRole: 'भूमिका बदला',
    selectLanguage: 'भाषा निवडा',
    logout: 'लॉग आउट',
    login: 'लॉग इन',
    demoModeNotice: 'डेमो मोड: नमुना क्रेडेंशियल्ससह त्वरित साइन इन करण्यासाठी ऑटो-फिलवर क्लिक करा',
    demoModeBadge: 'नमुना प्रोफाईल सक्रिय',
    portalBadge: 'डिजिटल कृषी नेटवर्क',
    verified: 'सत्यापित',
    verifiedFarmer: 'सत्यापित शेतकरी',
    licensedTrader: 'परवानाधारक APMC व्यापारी',
    nationalSurveillance: 'राष्ट्रीय कृषी देखरेख',
    digitalAgriOS: 'राष्ट्रीय e-NAM कनेक्टेड',
    search: 'बाजार समिती किंवा पीक शोधा...',
    filter: 'फिल्टर',
    all: 'सर्व',
    viewAll: 'सर्व पहा',
    back: 'मागे',
    cancel: 'रद्द करा',
    confirm: 'पुष्टी करा',
    submit: 'प्रस्तुत करा',
    save: 'जतन करा',
    status: 'स्थिती',
    actions: 'कृती',
    details: 'तपशील',
    date: 'तारीख',
    price: 'दर / किंमत',
    quantity: 'प्रमाण',
    total: 'एकूण',
    loading: 'लोड होत आहे...',
    success: 'यशस्वी',
    error: 'त्रुटी',
    close: 'बंद करा',
    quintal: 'क्विंटल',
    ton: 'टन',
    perQuintal: '₹/क्विंटल',
    perKg: '₹/किलो',
    updatedJustNow: 'आत्ताच अपडेट झाले',
    updatedMinsAgo: 'मिनिटांपूर्वी',
    phone: 'फोन नंबर',
    prototypeData: 'प्रोटोटाइप डेटा',
    aiEstimate: 'AI अंदाज',
    aiAssistedEstimateBadge: 'AI-सहाय्यित अंदाज (LLM-आधारित)',
    aiAssistedEstimateExplanation: 'हा अंदाज सामान्य बाजार पद्धतींवर आधारित AI लँग्वेज मॉडेलद्वारे तयार केला गेला आहे, ऐतिहासिक किंमत डेटावर प्रशिक्षित सांख्यिकीय मॉडेलवर नाही. ऐतिहासिक ॲगमार्कनेट डेटावर प्रशिक्षित आणि अचूकतेची पडताळणी केलेले बॅकटेस्टेड अंदाज मॉडेल (LightGBM) पुढील आवृत्तीत नियोजित आहे.',
    aiAssistedEstimateInfoTitle: 'अंदाज कार्यपद्धती आणि पारदर्शकता',
    referencePriceData: 'संदर्भ बाजारभाव डेटा',
    simulatedData: 'सिम्युलेटेड डेटा',
    simulatedBookingNote: 'सूचना: वाहतूक आणि वाहन चालक तपशील प्रोटोटाइप प्रात्यक्षिकासाठी सिम्युलेट केलेले आहेत.',
    distanceToMandi: 'बाजार समितीचे अंतर',
    calculatedDistance: 'अंदाजित अंतर',
    liveData: 'थेट बाजारभाव माहिती',

    // Roles & Selection Screen
    roleSelectionTitle: 'आपले पोर्टल निवडा',
    roleSelectionSubtitle: 'शेतकरी, घाऊक APMC व्यापारी आणि धोरणकर्ते यांच्यातील थेट व सुरक्षित संपर्क.',
    farmer: 'शेतकरी',
    farmerDesc: 'थेट बाजारभाव, AI किंमत अंदाज, वाहतूक खर्च वजा जाता निव्वळ नफा आणि थेट व्यापाऱ्यांना विक्री.',
    merchant: 'व्यापारी / आडते',
    merchantDesc: 'सत्यापित शेतकरी पिकांचे लॉट तपासा, खरेदी मागणी नोंदवा आणि थेट इलेक्ट्रॉनिक व्यापार करार करा.',
    government: 'सरकारी अधिकारी',
    governmentDesc: 'प्रादेशिक कृषी पुरवठ्याचे निरीक्षण, बाजारभाव तफावत विश्लेषण आणि AI मॅक्रो धोरण सल्ला.',
    continueAsFarmer: 'शेतकरी पोर्टल सुरू करा',
    continueAsMerchant: 'व्यापारी पोर्टल सुरू करा',
    continueAsGovernment: 'देखरेख पोर्टल सुरू करा',
    producerBadge: 'उत्पादक',
    procurementBadge: 'खरेदी',
    surveillanceBadge: 'देखरेख व धोरण',
    apmcLinked: 'e-NAM संलग्न',
    krushiAiActive: 'AI इंजिन सक्रिय',
    multiStateSurveillance: 'राज्यव्यापी कव्हरेज',

    // Auth Modal
    loginTitle: 'सुरक्षित साइन-इन',
    loginSubtitle: 'आपला नोंदणीकृत मोबाईल नंबर आणि ओळख क्रमांक टाका',
    enterMobile: 'मोबाईल नंबर',
    enterOtp: '६-अंकी OTP टाका',
    sendOtp: 'पडताळणी कोड पाठवा',
    verifyOtp: 'सत्यापित करा आणि पुढे जा',
    autoFillDemo: 'डेमो क्रेडेंशियल आपोआप भरा',
    krushiId: 'किसान आयडी (PM-KISAN / कृषी आयडी)',
    apmcLicense: 'APMC परवाना क्रमांक',
    govBadgeId: 'सरकारी विभाग आयडी',
    authDisclaimer: 'सुरक्षा सूचना: प्रात्यक्षिक मोडमध्ये OTP "123456" स्वीकारला जातो.',
    mobileLabel: 'नोंदणीकृत मोबाईल नंबर',
    otpCodeLabel: 'OTP पाठवला गेला',
    demoCredentialsNote: 'चाचणी मोड सक्रिय',
    resendOtp: 'पुन्हा कोड पाठवा',
    didntReceiveCode: 'कोड मिळाला नाही?',

    // Farmer Nav
    home: 'मुख्यपृष्ठ',
    marketPrices: 'बाजार भाव',
    addProduce: 'पीक नोंदवा',
    bestPlaceToSell: 'विक्रीसाठी सर्वोत्तम बाजार',
    buyerOffers: 'व्यापारी ऑफर्स',
    farmStore: 'कृषी सेवा केंद्र',
    salesTracking: 'विक्री ट्रॅकिंग',
    aiAssistant: 'AI कृषी सल्लागार',
    profile: 'माझी प्रोफाइल',
    askKrushiAI: 'कृषी AI ला विचारा',
    netEarnings: 'निव्वळ नफा',

    // Farmer Dashboard
    greeting: 'पुन्हा स्वागत आहे',
    liveMandiTicker: 'थेट APMC बाजारभाव',
    quickActions: 'जलद कृती',
    listNewHarvest: 'नवीन पीक विक्रीसाठी नोंदवा',
    checkAIPrediction: 'AI किंमत अंदाज',
    viewBuyerBids: 'थेट व्यापारी ऑफर्स पहा',
    weatherAdvisory: 'हवामान सल्ला',
    weatherRainAlert: 'थेट उपग्रह व हवामान अंदाज लोड होत आहे...',
    weatherUnavailable: 'हवामान डेटा तात्पुरता उपलब्ध नाही',
    rainProbability: 'पावसाची शक्यता',
    liveWeather: 'थेट हवामान (Open-Meteo)',
    weatherAdvisoryHighRain: 'पुढील ४८ तासांत {prob}% पावसाची शक्यता — काढणी केलेले पीक ताडपत्रीने झाकून सुरक्षित ठेवा.',
    weatherAdvisoryModerateRain: 'पुढील ४८ तासांत मध्यम पावसाची शक्यता ({prob}%) — माल वाहतूक आणि धान्य वाळवण्याचे योग्य नियोजन करा.',
    weatherAdvisoryDry: 'कोरडे आणि निरभ्र हवामान अपेक्षित ({prob}% पावसाचा धोका) — काढणी, धान्य वाळवणे आणि माल वाहतुकीसाठी पोषक वातावरण.',
    trendingCrops: 'चालू बाजारभाव आणि ट्रेंड',
    priceTrend: '७-दिवसीय भाव कल',
    estimatedEarnings: 'अंदाजित एकूण मूल्य',
    recentListings: 'माझी नोंदवलेली पिके',
    kisanId: 'किसान आयडी',
    acresLabel: 'लागवड क्षेत्र (एकर)',
    highConfidence: 'उच्च अचूकता',
    wheatInsightHeadline: 'लोकवन गव्हाचे भाव १२ दिवसांत उच्चांक गाठण्याची शक्यता (+₹१४०/क्विंटल).',
    mandiAggregatedNote: '१८ प्रादेशिक बाजार समित्यांतून एकत्रित माहिती',
    activeBenchmark: 'सक्रिय निर्देशांक',
    liveENAM: 'थेट e-NAM',
    peakRateToday: 'आजचा कमाल दर',
    aboveMSP: 'हमीभावापेक्षा जास्त',
    puneMandiYard: 'पुणे बाजार समिती',
    commodity: 'पीक / शेतीमाल',
    category: 'वर्गवारी',
    trend: 'कल',
    action: 'कृती',
    sellThis: 'हे पीक विका',

    // Farmer Market Prices & Calculator
    marketPricesTitle: 'थेट बाजारभाव व निव्वळ नफा गणकयंत्र',
    marketPricesSubtitle: 'वाहतूक खर्च आणि बाजार सेस वजा करून विविध बाजार समित्यांमधील निव्वळ नफ्याची तुलना.',
    selectCrop: 'पीक निवडा',
    selectMandi: 'बाजार समिती निवडा',
    netEarningsCalculator: 'वास्तविक निव्वळ नफा गणकयंत्र',
    adjustQuantity: 'विक्री प्रमाण (क्विंटल)',
    grossExpected: 'एकूण अपेक्षित रक्कम',
    transportCost: 'अंदाजित वाहतूक खर्च',
    handlingCost: 'APMC हमाली व तोलाई',
    estimatedNetProfit: 'हातात येणारी निव्वळ रक्कम',
    bookTransport: 'वाहतूक वाहन बुक करा',
    alternativeMarkets: 'इतर बाजार समित्यांची तुलना',
    aiMarketInsight: 'AI बाजार विश्लेषण',
    sevenDayMovement: '७-दिवसीय भाव चढ-उतार',
    highGrade: 'दर्जा A प्रीमियम',
    directLogisticsNote: 'जीपीएस वजनकाटा पडताळणीसह थेट शेतातून माल उचल.',
    calculateNetPayout: 'निव्वळ नफा मोजा',

    // Farmer Add Produce
    addProduceTitle: 'थेट विक्रीसाठी शेतमाल नोंदवा',
    addProduceSubtitle: 'आपला शेतमाल थेट प्रमाणित घाऊक व्यापारी आणि प्रक्रिया उद्योगांना दाखवा.',
    cropDetails: 'पिकाची माहिती',
    cropName: 'पिकाचे नाव',
    cropVariety: 'वाण / जात',
    variety: 'वाण / जात',
    harvestQuantity: 'उत्पादन प्रमाण (क्विंटल)',
    qualityGrade: 'गुणवत्ता दर्जा',
    gradeA: 'ग्रेड A (निर्यातक्षम / दर्जेदार)',
    gradeB: 'ग्रेड B (प्रमाणित व्यावसायिक)',
    gradeC: 'ग्रेड C (प्रक्रिया योग्य)',
    expectedPricePerQtl: 'अपेक्षित दर (₹/क्विंटल)',
    farmLocation: 'शेताचे ठिकाण / गाव',
    storageLocation: 'साठवणूक / शेताचे ठिकाण',
    uploadCropPhoto: 'पिकाचा फोटो अपलोड करा',
    publishListing: 'नेटवर्कवर नोंदणी करा',
    listingSuccess: 'शेतमाल यशस्वीरित्या नोंदवला गेला!',
    useCurrentLocation: 'GPS लोकेशन वापरा',
    locatingGps: 'लोकेशन शोधत आहे...',
    selectCropType: 'पिकाचा प्रकार निवडा',
    gradeNote: 'डिजिटल APMC मानकांनुसार दर्जा तपासणी.',
    gradePhotoHint: 'माल पसरवून, चांगल्या उजेडात स्पष्ट फोटो काढा — आमचा AI लगेच दर्जा ठरवेल.',
    analyzingGrade: 'फोटोचे विश्लेषण सुरू आहे...',
    retakePhoto: 'फोटो पुन्हा काढा',
    gradeAnalysisConfidence: 'AI विश्वासार्हता',
    gradeAnalysisError: 'फोटोचे विश्लेषण करता आले नाही. कृपया पुन्हा प्रयत्न करा.',
    estimatedListingValue: 'अंदाजित एकूण मूल्य',
    activeBuyerBidsWaiting: 'व्यापारी ऑफर्स उपलब्ध',
    submitProduce: 'शेतमाल विक्रीसाठी प्रसिद्ध करा',

    // Farmer Best Place to Sell
    bestPlaceTitle: 'AI स्मार्ट बाजार समिती शिफारस',
    bestPlaceSubtitle: 'अंतर, इंधन, टोल आणि बाजार शुल्क विचारात घेऊन सर्वाधिक निव्वळ नफ्याची गणना.',
    highestNetProfit: 'सर्वाधिक निव्वळ नफा',
    distance: 'अंतर',
    sellingPrice: 'APMC चालू दर',
    arbitrageInsight: 'जादा नफ्याची संधी',
    initiateSale: 'निवडा आणि येथे विका',
    smartLogistics: 'समन्वित वाहतूक व्यवस्था',
    aiArbitrageNote: 'स्थानिक बाजाराऐवजी पुण्यात माल विकल्यास सर्व वाहतूक खर्च वजा जाता ₹१४,२०० अधिक मिळतात.',
    viewDirectOffers: 'व्यापारी ऑफर्स पहा',

    // Farmer Buyer Offers
    buyerOffersTitle: 'थेट घाऊक खरेदीदारांच्या ऑफर्स (RFQs)',
    buyerOffersSubtitle: 'नोंदवलेल्या शेतमालासाठी थेट प्राप्त झालेल्या खरेदी प्रस्तावांची पडताळणी करा.',
    compareMode: 'तुलना मोड',
    offeredPrice: 'प्रस्तावित दर',
    quantityRequired: 'मागणीचे प्रमाण',
    totalPayout: 'एकूण पेमेंट मूल्य',
    paymentTerms: 'पेमेंट अटी',
    acceptOffer: 'ऑफर स्वीकारा',
    declineOffer: 'नाकारा',
    offerAccepted: 'ऑफर स्वीकारली! डिजिटल गेट पास तयार झाला.',
    offerAcceptedPass: 'ऑफर मंजूर • गेट पास जारी',
    offerDeclined: 'ऑफर नाकारली',
    directRfqBadge: 'थेट खरेदी ऑर्डर',
    directAPMCRFQs: 'थेट APMC RFQs',
    listedQuantity: 'आपला नोंदवलेला शेतमाल',
    expectedBasePrice: 'आपला अपेक्षित दर',
    instantEnamPayout: 'थेट बँक खात्यात पैसे (T+0)',
    pickupFromFarm: 'शेतातून माल वाहतूक समाविष्ट',
    buyerVerificationScore: 'व्यापारी पत मानांकन: ९८% सत्यापित',
    bestMatch: 'सर्वोत्तम मूल्य जुळणी',
    fastPickup: 'त्याच दिवशी उचल',
    requiredQuality: 'अपेक्षित ग्रेड',
    declined: 'नाकारले',
    decline: 'नाकारा',
    backToDashboard: 'डॅशबोर्डवर परत जा',

    // Warehouse & Storage Discovery
    findStorage: 'गोदाम व शीतगृह शोधा',
    warehouseDiscovery: 'गोदाम व शीतगृह डिरेक्टरी',
    warehouseDiscoverySubtitle: 'महाराष्ट्रातील WDRA अधिकृत गोदामे, सायलो व शीतगृहांची अंतर व दरानुसार यादी.',
    nearestWarehouses: 'अंतराच्या क्रमाने ५ जवळची गोदामे',
    storageDirectoryNote: 'नोंदणीकृत गोदामांची संदर्भ निर्देशिका — थेट उपलब्धतेसाठी संबंधित गोदामाशी संपर्क साधा.',
    wdraRegistered: 'WDRA नोंदणीकृत',
    wdraEligible: 'WDRA नोंदणीकृत • e-NWR पात्र',
    coldStorage: 'शीतगृह (कोल्ड स्टोरेज)',
    dryStorage: 'कोरडे गोदाम (Dry Godown)',
    siloStorage: 'धान्य सायलो',
    allTypes: 'सर्व प्रकार',
    availableCapacity: 'उपलब्ध क्षमता',
    totalCapacity: 'एकूण क्षमता',
    dailyRatePerQtl: '₹/क्विंटल/दिवस',
    selectWarehouse: 'गोदाम निवडा',
    selectedWarehouse: 'निवडलेले गोदाम',
    changeWarehouse: 'गोदाम बदला',
    contactWarehouse: 'गोदामाशी संपर्क साधा',
    callWarehouse: 'फोन करा',
    selectStorageForProduce: 'शेतमालासाठी गोदाम निवडा',
    noStorageSelected: 'अजून गोदाम निवडलेले नाही',
    chooseStorageLocation: 'नोंदणीकृत गोदाम निवडा',
    nearestStorageLabel: 'जवळचे साठवणूक केंद्र',
    searchByDistrict: 'जिल्ह्यानुसार शोधा',
    allDistricts: 'सर्व जिल्हे (महाराष्ट्र)',

    // Store vs Sell Now Comparison
    storeVsSellTitle: 'आताच विका विरूद्ध साठवून ठेवा तुलना',
    storeVsSellSubtitle: 'तात्काळ विक्री आणि गोदामात साठवून नंतर विक्री यामधील नियम-आधारित आर्थिक नफा विश्लेषण.',
    sellNowOption: 'आताच विका',
    storeAndSellLaterOption: 'साठवून ठेवा व नंतर विका',
    recommendedChoice: 'शिफारस केलेला पर्याय',
    netProceeds: 'निव्वळ नफा/रक्कम',
    storageCostForDuration: 'एकूण साठवणूक भाडे',
    storageDuration: 'साठवणूक कालावधी',
    days: 'दिवस',
    storageEstimateDisclaimer: 'हा अंदाज चालू बाजारभाव आणि दैनंदिन गोदामाच्या भाड्यावर आधारित आहे. प्रत्यक्ष नफा आवक आणि वजनकाटा प्रतवारीवर अवलंबून असेल.',
    sellingNowHigher: 'आताच विक्री करणे अधिक फायदेशीर',
    storingHigher: 'साठवून ठेवणे अधिक फायदेशीर',
    calculateStorageComparison: 'साठवणूक नफा तपासा',
    exploreWarehouses: 'गोदामे पहा',

    // Farmer Store
    farmStoreTitle: 'शासकीय प्रमाणित कृषी निविष्ठा केंद्र',
    farmStoreSubtitle: 'थेट लाभ हस्तांतरण (DBT) अनुदानित बियाणे, सेंद्रिय खते आणि अवजारे.',
    certifiedSeeds: 'प्रमाणित बियाणे',
    bioFertilizers: 'सेंद्रिय खते व सूक्ष्म अन्नद्रव्ये',
    equipmentSubsidies: 'अनुदानित कृषी अवजारे',
    houseware: 'घरगुती भांडी व साधने',
    govSubsidyDiscount: 'DBT अनुदान लागू',
    orderNow: 'अनुदानासह ऑर्डर करा',
    freeDeliveryToPanchayat: 'ग्रामपंचायत केंद्रापर्यंत मोफत पोहोच',
    dbtSubsidyLink: 'PM-KISAN आधार DBT संलग्न',
    allInputs: 'सर्व कृषी साहित्य',
    inStock: 'प्रादेशिक गोदामात उपलब्ध',
    orderSuccessMsg: 'अनुदानित ऑर्डर नोंदवली गेली!',
    deliveryTokenNote: 'कलेक्शन टोकन एसएमएसने पाठवला आहे. पंचायत केंद्रात दाखवा.',
    applySubsidy: 'DBT अनुदान मिळवा',
    subsidizedPrice: 'अनुदानित किंमत',
    confirmSubsidizedOrder: 'अनुदानित ऑर्डर निश्चित करा',
    confirmOrder: 'ऑर्डर निश्चित करा',

    // Farmer Sales Tracking
    salesTrackingTitle: 'विक्री पावत्या, गेट पास व DBT पेमेंट ट्रॅकिंग',
    salesTrackingSubtitle: 'अधिकृत व्यवहार नोंदी, डिजिटल e-NAM वजनकाटा पावत्या आणि थेट बँक जमा रकमा.',
    activeShipments: 'वाहतुकीत व वजनकाटा',
    completedSales: 'जमा झालेले पेमेंट',
    trackMandiGatePass: 'डिजिटल गेट पास',
    downloadENAMReceipt: 'e-NAM पावती डाउनलोड करा',
    paymentStatus: 'पेमेंट स्थिती',
    totalRealizedRevenue: 'एकूण जमा झालेली रक्कम',
    totalHarvestSold: 'एकूण विकलेला शेतमाल',
    activeInTransit: 'वाहतुकीत असलेले लॉट्स',
    shipment: 'लॉट्स',
    activeLotsCount: 'चालू विक्री लॉट्स',
    directBankDbt: 'थेट बँक खात्यात जमा (DBT)',
    buyerName: 'खरेदीदार व्यापारी',
    lotId: 'लॉट आयडी क्रमांक',
    weighbridgeWeight: 'वजनकाट्यावरील वजन',
    settlementSlip: 'पेमेंट पावती',
    digitalSettlementSlip: 'डिजिटल e-NAM हिशोब पावती',
    taxInvoiceId: 'टॅक्स इनव्हॉइस आणि सेस पावती',
    paidCleared: 'पेमेंट पूर्ण',
    inTransit: 'वाहतुकीत',
    gatePassNumber: 'गेट पास क्रमांक',
    netSettledAmount: 'निव्वळ जमा रक्कम',
    transactionRef: 'व्यवहार संदर्भ',
    quantityWeighed: 'वजनकाटा निव्वळ वजन',
    rateRealized: 'मिळालेला दर',
    netBankTransfer: 'बँक खात्यात जमा (DBT)',
    directDBTBeneficiary: 'DBT लाभार्थी बँक खाते',
    downloadInvoice: 'अधिकृत इनव्हॉइस पीडीएफ डाउनलोड करा',

    // Farmer AI Prediction
    predictiveEngine: 'किंमत अंदाज इंजिन',
    aiForecasting: 'AI भाव अंदाज व कृषी बाजार सल्ला',
    aiForecastingSubtitle: 'ऐतिहासिक हंगामी चक्र, पर्जन्यमान निर्देशांक आणि आवक डेटावर प्रशिक्षित मशीन लर्निंग मॉडेल.',
    updatedToday: 'आज अपडेट केलेले मॉडेल',
    risingTrend: 'भाव वाढीचा अंदाज',
    currentPrice: 'चालू बाजारभाव',
    expected: '१४ दिवसांत अपेक्षित दर',
    certainty: 'विश्वासार्हता निर्देशांक',
    modelCalibratedNote: 'गेल्या ५ वर्षांच्या APMC आवक आणि चालू हवामान रडारनुसार मॉडेल तयार केले आहे.',
    findBestMandis: 'सर्वोत्तम बाजार समित्या शोधा',
    keyMarketDrivers: 'महत्त्वाचे बाजार घटक',
    lowerRainfall: 'उत्तर भारतात कमी पाऊस',
    lowerRainfallDesc: 'उत्तरी मैदानी भागात उशिरा पेरणीमुळे चालू आवक १८% ने घटली आहे.',
    highExportDemand: 'बंदरावर मजबूत निर्यात मागणी',
    highExportDemandDesc: 'JNPT बंदरावर वाढत्या निर्यात वाहतुकीमुळे दरांना भक्कम आधार मिळत आहे.',
    askAIAdvisor: 'AI कृषी सल्लागाराला विचारा',
    askLiveQuestion: 'बाजारभाव, हवामान किंवा कीड नियंत्रणाबद्दल प्रश्न विचारा...',
    send: 'विचारा',
    aiDisclaimer: 'AI अंदाज आणि विश्लेषण हे केवळ प्रात्यक्षिक व मार्गदर्शनासाठी आहेत. प्रत्यक्ष बाजार दर आणि प्रतवारीनुसार फरक असू शकतो.',

    // Farmer Profile
    profileTitle: 'शेतकरी प्रोफाइल व पडताळणी',
    kycVerified: 'आधार आणि ७/१२ डिजिटल KYC प्रमाणित',
    cultivatedLand: 'नोंदणीकृत शेतजमीन',
    cropSpecialization: 'मुख्य पिके',
    sellerScore: 'सत्यापित विक्रेता रेटिंग',
    bankAccountTitle: 'थेट बँक खाते (DBT)',
    bankName: 'बँकेचे नाव',
    accountNumber: 'खाते क्रमांक',
    ifscCode: 'IFSC कोड',
    directPayoutEnabled: 'थेट e-NAM बँक पेमेंट सक्रिय',
    portalShortcuts: 'जलद सेवा',
    governmentSubsidies: 'सक्रिय शासकीय योजना',
    pmKisanActive: 'PM-KISAN स्थिती: सक्रिय (१८वा हप्ता जमा)',
    cropInsurancePMFBY: 'PMFBY पीक विमा: रब्बी २०२६ पॉलिसी सक्रिय',

    // Merchant Hub
    merchantDashboardTitle: 'व्यापारी खरेदी व बोली टर्मिनल',
    merchantDashboardSubtitle: 'स्थानिक शेतकऱ्यांकडून थेट दर्जेदार शेतमाल खरेदीसाठी डिजिटल व्यासपीठ.',
    postRequirement: 'खरेदी मागणी नोंदवा',
    directFarmerLots: 'उपलब्ध शेतकरी शेतमाल लॉट्स',
    placePurchaseBid: 'खरेदी बोली लावा',
    commodityDemandVelocity: 'शेतमाल मागणी वेग',
    myActiveBids: 'माझ्या चालू बोली',
    procuredOrders: 'खरेदी केलेला शेतमाल',
    rabiSeason: 'रब्बी हंगाम',
    kharifSeason: 'खरीप हंगाम',
    farmerLocation: 'शेताचे ठिकाण',
    bidPlacedSuccess: 'शेतकऱ्याला बोली पाठवली!',
    minOrderQty: 'किमान लॉट आकार',
    targetBuyPrice: 'खरेदी लक्ष्य दर',
    destinationWarehouse: 'गोदाम ठिकाण',

    // Government Portal
    govSurveillanceTitle: 'राष्ट्रीय कृषी देखरेख पोर्टल',
    surveillanceTitle: 'राष्ट्रीय पीक देखरेख व किंमत गुप्तवार्ता',
    govSurveillanceSubtitle: 'धोरणात्मक विश्लेषण, भाव स्थिरीकरण निर्देशांक आणि बाजार समिती आवक ट्रॅकिंग.',
    surveillanceSubtitle: 'धोरणात्मक विश्लेषण, भाव स्थिरीकरण निर्देशांक आणि बाजार समिती आवक ट्रॅकिंग.',
    regionalHotspots: 'प्रादेशिक भाव तफावत व अस्थिरता',
    regionalPriceHotspots: 'प्रादेशिक भाव तफावत व अस्थिरता',
    totalActiveFarmers: 'एकूण सक्रिय शेतकरी',
    totalTradeVolume: 'एकूण व्यापार प्रमाण',
    priceTrendIndex: 'सरासरी भाव कल निर्देशांक',
    supplyForecast: 'प्रादेशिक बाजार समिती पुरवठा अंदाज',
    aiDemandPrediction: 'AI मागणी अंदाज व धोरण सल्ला',
    exportReport: 'अहवाल निर्यात करा',
    generateAIInsights: 'धोरण सारांश तयार करा',
    generateInsights: 'धोरण सारांश तयार करा',
    farmersRegistry: 'शेतकरी नोंदणी वही',
    mspCompliance: 'हमीभाव (MSP) पालन निर्देशांक',
    bufferStocks: 'राखीव साठा व्यवस्थापन',
    nationalFeed: 'थेट APMC नेटवर्क',
    highRiskDisparity: 'उच्च भाव अस्थिरता',
    moderateVolatility: 'मध्यम भाव चढ-उतार',
    strategicPolicyBrief: 'धोरणात्मक संक्षिप्त अहवाल',
    generatingPolicyAi: 'मॅक्रोइकोनॉमिक मॉडेलचे विश्लेषण सुरू आहे...',

    // Modals & Chat AI
    askAgronomistTitle: 'कृषी AI सहाय्यक',
    aiChatPlaceholder: 'बाजारभाव, खत व्यवस्थापन किंवा हवामानाबद्दल विचारा...',
    sendQuestion: 'प्रश्न विचारा',
    transportBookingTitle: 'माल वाहतूक वाहन बुक करा',
    vehicleType: 'वाहनाचा प्रकार निवडा',
    pickupSlot: 'पिकअप वेळ निवडा',
    transportConfirmed: 'वाहतूक यशस्वीरित्या बुक झाली!',
    bookingId: 'वाहतूक बुकिंग आयडी',
    postProcurementTitle: 'खरेदी मागणी नोंदवा',
    requirementSuccess: 'खरेदी मागणी प्रसारित केली गेली!',
    languageSelectTitle: 'आपली भाषा निवडा',
    languageSelectSubtitle: 'इंटरफेससाठी भाषा निवडा',

    // FPO Feature
    fpoNavLabel: 'FPO गट',
    fpoHubTitle: 'FPO उत्पादक गट',
    fpoHubSubtitle: 'चांगल्या घासाघीस क्षमतेसाठी जवळच्या शेतकऱ्यांसोबत तुमचा माल एकत्र करण्यासाठी शेतकरी उत्पादक संस्थेत सामील व्हा.',
    fpoJoinButton: 'FPO मध्ये सामील व्हा',
    fpoJoinedBadge: 'सामील',
    fpoMemberCount: 'सदस्य',
    fpoOfficeBearer: 'पदाधिकारी',
    fpoPrimaryCrops: 'मुख्य पिके',
    fpoAggregationToggle: 'माझ्या FPO गटाचा भाग म्हणून सूचीबद्ध करा',
    fpoAggregationHint: 'इतर FPO सदस्यांसोबत एकत्र विक्री केल्यास मोठे खरेदीदार आकर्षित होऊ शकतात.',
    fpoPooledLotBadge: 'FPO एकत्रित लॉट',
    fpoPooledFrom: 'शेतकरी एकत्रित',
    fpoDashboardTitle: 'FPO पदाधिकारी सारांश',
    fpoTotalPooled: 'या हंगामात एकूण एकत्रित',
    fpoNoFpoJoined: 'तुम्ही अजून कोणत्याही FPO मध्ये सामील झाला नाही. सामील होण्यासाठी खालील गट पहा.',
    fpoSearchByDistrict: 'जिल्ह्यानुसार शोधा',

    // Dispute / Grievance
    raiseIssueButton: 'तक्रार नोंदवा',
    disputeCenterTitle: 'तक्रार निवारण केंद्र',
    disputeReasonLabel: 'कारण',
    disputeReasonQuality: 'गुणवत्तेतील फरक',
    disputeReasonPayment: 'देयक विलंब',
    disputeReasonQuantity: 'प्रमाणातील फरक',
    disputeReasonOther: 'इतर',
    disputeNoteLabel: 'समस्येचे वर्णन करा',
    disputeSubmit: 'तिकीट सबमिट करा',
    disputeStatusOpen: 'उघडे',
    disputeStatusReview: 'पुनरावलोकनात',
    disputeStatusResolved: 'निकाली',
    disputeSuccessMessage: 'तुमची तक्रार नोंदवली गेली आहे. आमची टीम लवकरच आढावा घेईल.',
    noDisputesYet: 'अद्याप कोणतीही तक्रार नोंदवलेली नाही.',
    myDisputes: 'माझ्या तक्रारी',

    // Verification & Quality
    verifiedBuyerBadge: 'GST सत्यापित',
    unverifiedBuyerBadge: 'असत्यापित',
    gstVerifiedLabel: 'GST आणि फोन पुष्टीकरणाद्वारे सत्यापित',
    qualityTrackRecord: 'गुणवत्ता ट्रॅक रेकॉर्ड',
    rateQualityReceived: 'मिळालेल्या गुणवत्तेला रेट करा',
    qualityRatingSubmitted: 'धन्यवाद! तुमचे गुणवत्ता रेटिंग नोंदवले गेले आहे.',
    markAsPaidButton: 'देयक मिळाल्याची पुष्टी करा',
    paymentConfirmedMessage: 'देयक स्थिती "देयक झाले" मध्ये अद्ययावत केली.',

    // Forecast transparency
    statisticalBaselineBadge: 'सांख्यिकीय आधाररेषा (नियम-आधारित)',
    statisticalBaselineExplanation: 'हा अलीकडील किंमतीतील हालचालीवरून (मूव्हिंग सरासरी + रेषीय कल) मोजलेला निश्चित अंदाज आहे — हा AI-निर्मित नाही. तुलनेसाठी LLM अंदाजासोबत दाखवला आहे.',
    arrivalDataUnavailable: 'आवक डेटा नोंदवलेला नाही',
  },
};

export const TRANSLATIONS = translations;
