import { useRouter } from 'expo-router';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AllFlightStat() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2D0F5E" />
      
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <View style={styles.headerRow}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>FlightHub Passport</Text>
          
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* ALL-TIME Badge */}
        <View style={styles.badgeContainer}>
          <View style={styles.allTimeBadge}>
            <Text style={styles.allTimeText}>ALL-TIME</Text>
          </View>
        </View>

        {/* Decorative Flight Path */}
        <View style={styles.flightPathContainer}>
          <View style={styles.flightPath}>
            {[...Array(15)].map((_, index) => (
              <View key={index} style={styles.flightPathItem}>
                {index % 5 === 0 ? (
                  <View style={styles.airportDot} />
                ) : (
                  <FontAwesome 
                    name="plane" 
                    size={8} 
                    color="rgba(255,255,255,0.4)" 
                    style={styles.planeIcon}
                  />
                )}
                {index < 14 && <View style={styles.pathLine} />}
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Purple Section Container */}
        <View style={styles.purpleSection}>
          {/* World Map */}
          <View style={styles.mapContainer}>
            <Image 
              source={require('../../assets/map.jpg')} // Using your map image
              style={styles.worldMap}
              resizeMode="cover"
            />
            <View style={styles.mapOverlay} />
          </View>

          {/* Passport Section - Keep in Purple */}
          <View style={styles.passportSection}>
            <View style={styles.passportHeader}>
              <View>
                <Text style={styles.passportTitle}>MY FLIGHTHUB PASSPORT</Text>
                <Text style={styles.passportSubtitle}>🛂 PASSPORT • PASS • PASAPORTE</Text>
              </View>
              <View style={styles.passportIcon}>
                <MaterialIcons name="flight" size={24} color="white" />
              </View>
            </View>

            {/* Flight Statistics */}
            <View style={styles.statsContainer}>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>FLIGHTS</Text>
                  <Text style={styles.statValue}>0</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>FLIGHT DISTANCE</Text>
                  <Text style={styles.statValue}>0 mi</Text>
                </View>
              </View>
              
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>FLIGHT TIME</Text>
                  <Text style={styles.statValue}>0m</Text>
                </View>
                <View style={styles.statItemRow}>
                  <View style={styles.statHalf}>
                    <Text style={styles.statLabel}>AIRPORTS</Text>
                    <Text style={styles.statValue}>0</Text>
                  </View>
                  <View style={styles.statHalf}>
                    <Text style={styles.statLabel}>AIRLINES</Text>
                    <Text style={styles.statValue}>0</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* White Content Sections - Start from Flights */}
        <View style={styles.whiteContentContainer}>
          {/* Flights Section */}
          <View style={styles.whiteSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Flights</Text>
              <TouchableOpacity style={styles.shareButtonWhite}>
                <Ionicons name="share-outline" size={20} color="#666" />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.bigNumber}>0</Text>
            <View style={styles.flightBreakdown}>
              <Text style={styles.breakdownText}>0 domestic</Text>
              <Text style={styles.breakdownText}>0 international</Text>
              <Text style={styles.breakdownText}>0 long haul</Text>
            </View>
          </View>

          {/* Flight Distance Section */}
          <View style={styles.whiteSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Flight Distance</Text>
              <TouchableOpacity style={styles.shareButtonWhite}>
                <Ionicons name="share-outline" size={20} color="#666" />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.distanceContainer}>
              <Text style={styles.bigNumber}>0</Text>
              <Text style={styles.unitText}>mi</Text>
            </View>
            <Text style={styles.averageText}>Average distance: 0 mi</Text>
            
            {/* Distance Comparisons */}
            <View style={styles.comparisonContainer}>
              <View style={styles.comparisonItem}>
                <Text style={styles.earthEmoji}>🌍</Text>
                <View style={styles.comparisonBar}>
                  <Text style={styles.comparisonText}>0x around Earth</Text>
                </View>
              </View>
              <View style={styles.comparisonItem}>
                <Text style={styles.moonEmoji}>🌙</Text>
                <View style={styles.comparisonBar}>
                  <Text style={styles.comparisonText}>0x to the Moon</Text>
                </View>
              </View>
              <View style={styles.comparisonItem}>
                <Text style={styles.marsEmoji}>🔴</Text>
                <View style={styles.comparisonBar}>
                  <Text style={styles.comparisonText}>0x to Mars</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Flight Time Section */}
          <View style={styles.whiteSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Flight Time</Text>
              <TouchableOpacity style={styles.shareButtonWhite}>
                <Ionicons name="share-outline" size={20} color="#666" />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.bigNumber}>0</Text>
              <Text style={styles.unitText}>m</Text>
            </View>
            <View style={styles.timeBreakdown}>
              <Text style={styles.breakdownText}>0 days</Text>
              <Text style={styles.breakdownText}>0 weeks</Text>
              <Text style={styles.breakdownText}>0 months</Text>
              <Text style={styles.breakdownText}>0 years</Text>
            </View>

            {/* Flight Time Info Boxes */}
            <View style={styles.infoBoxContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxLabel}>Avg flight time</Text>
                <Text style={styles.infoBoxValue}>0m</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxLabel}>Spent In Air</Text>
                <Text style={styles.infoBoxValue}>0m</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxLabel}>Spent Taxiing</Text>
                <Text style={styles.infoBoxValue}>0m</Text>
              </View>
            </View>
          </View>

          {/* Top Airports Section */}
          <View style={styles.whiteSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Airports</Text>
              <TouchableOpacity style={styles.shareButtonWhite}>
                <Ionicons name="share-outline" size={20} color="#666" />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.bigNumber}>0</Text>
              <Text style={styles.totalText}>total airports</Text>
            </View>
          </View>

          {/* Top Airlines Section */}
          <View style={styles.whiteSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Airlines</Text>
              <TouchableOpacity style={styles.shareButtonWhite}>
                <Ionicons name="share-outline" size={20} color="#666" />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.bigNumber}>0</Text>
              <Text style={styles.totalText}>total airline</Text>
            </View>
            
            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                <Text style={[styles.tabText, styles.activeTabText]}>Flights</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab}>
                <Text style={styles.tabText}>Distance</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Top Routes Section */}
          <View style={styles.whiteSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Routes</Text>
              <TouchableOpacity style={styles.shareButtonWhite}>
                <Ionicons name="share-outline" size={20} color="#666" />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.bigNumber}>0</Text>
              <Text style={styles.totalText}>total routes</Text>
            </View>
            
            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                <Text style={[styles.tabText, styles.activeTabText]}>Flights</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab}>
                <Text style={styles.tabText}>Distance</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Countries & Territories Section */}
          <View style={styles.whiteSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Countries & Territories</Text>
              <TouchableOpacity style={styles.shareButtonWhite}>
                <Ionicons name="share-outline" size={20} color="#666" />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.bigNumber}>0</Text>
              <Text style={styles.totalText}>countries</Text>
            </View>

            {/* Countries Grid */}
            <View style={styles.countriesGrid}>
              <View style={styles.countryRow}>
                <View style={styles.countryItem}>
                  <Text style={styles.countryLabel}>Africa</Text>
                  <View style={styles.countryStats}>
                    <Text style={styles.countryNumber}>0</Text>
                    <Text style={styles.countryPercentage}>0%</Text>
                  </View>
                </View>
                <View style={styles.countryItem}>
                  <Text style={styles.countryLabel}>Asia</Text>
                  <View style={styles.countryStats}>
                    <Text style={styles.countryNumber}>0</Text>
                    <Text style={styles.countryPercentage}>0%</Text>
                  </View>
                </View>
                <View style={styles.countryItem}>
                  <Text style={styles.countryLabel}>C. America</Text>
                  <View style={styles.countryStats}>
                    <Text style={styles.countryNumber}>0</Text>
                    <Text style={styles.countryPercentage}>0%</Text>
                  </View>
                </View>
              </View>

              <View style={styles.countryRow}>
                <View style={styles.countryItem}>
                  <Text style={styles.countryLabel}>Caribbean</Text>
                  <View style={styles.countryStats}>
                    <Text style={styles.countryNumber}>0</Text>
                    <Text style={styles.countryPercentage}>0%</Text>
                  </View>
                </View>
                <View style={styles.countryItem}>
                  <Text style={styles.countryLabel}>Europe</Text>
                  <View style={styles.countryStats}>
                    <Text style={styles.countryNumber}>0</Text>
                    <Text style={styles.countryPercentage}>0%</Text>
                  </View>
                </View>
                <View style={styles.countryItem}>
                  <Text style={styles.countryLabel}>Middle East</Text>
                  <View style={styles.countryStats}>
                    <Text style={styles.countryNumber}>0</Text>
                    <Text style={styles.countryPercentage}>0%</Text>
                  </View>
                </View>
              </View>

              <View style={styles.countryRow}>
                <View style={styles.countryItem}>
                  <Text style={styles.countryLabel}>N. America</Text>
                  <View style={styles.countryStats}>
                    <Text style={styles.countryNumber}>0</Text>
                    <Text style={styles.countryPercentage}>0%</Text>
                  </View>
                </View>
                <View style={styles.countryItem}>
                  <Text style={styles.countryLabel}>Oceania</Text>
                  <View style={styles.countryStats}>
                    <Text style={styles.countryNumber}>0</Text>
                    <Text style={styles.countryPercentage}>0%</Text>
                  </View>
                </View>
                <View style={styles.countryItem}>
                  <Text style={styles.countryLabel}>S. America</Text>
                  <View style={styles.countryStats}>
                    <Text style={styles.countryNumber}>0</Text>
                    <Text style={styles.countryPercentage}>0%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Changed to white
  },
  stickyHeader: {
    backgroundColor: '#2D0F5E',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  shareButton: {
    padding: 5,
  },
  badgeContainer: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  allTimeBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  allTimeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // Flight Path Styles
  flightPathContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  flightPath: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  flightPathItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airportDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  planeIcon: {
    transform: [{ rotate: '45deg' }],
  },
  pathLine: {
    width: 12,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 3,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white', // Changed to white
  },
  scrollContent: {
    paddingBottom: 100,
  },
  // Purple Section Container
  purpleSection: {
    backgroundColor: '#2D0F5E', // Purple background for map and passport
  },
  // World Map Styles
  mapContainer: {
    height: 200,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  worldMap: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(99, 102, 241, 0.4)',
  },
  // Passport Section Styles
  passportSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  passportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  passportTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  passportSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  passportIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 8,
  },
  // Statistics Styles
  statsContainer: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    marginRight: 20,
  },
  statItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  statHalf: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  // White Content Styles
  whiteContentContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  whiteSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  shareButtonWhite: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  shareText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  bigNumber: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 80,
  },
  unitText: {
    fontSize: 40,
    color: '#666',
    marginLeft: 10,
  },
  flightBreakdown: {
    marginTop: 10,
  },
  breakdownText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  averageText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
  comparisonContainer: {
    marginTop: 10,
  },
  comparisonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  earthEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  moonEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  marsEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  comparisonBar: {
    flex: 1,
    backgroundColor: '#E8E4FF',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  comparisonText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  timeBreakdown: {
    marginTop: 10,
  },
  infoBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 3,
  },
  infoBoxLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  infoBoxValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 24,
    color: '#999',
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginRight: 30,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  // Countries Grid Styles
  countriesGrid: {
    marginTop: 20,
  },
  countryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  countryItem: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 3,
  },
  countryLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  countryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  countryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  countryPercentage: {
    fontSize: 14,
    color: '#999',
  },
});