import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AllDelayStat() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7F1D1D" />
      
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <View style={styles.headerRow}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Delay Report</Text>
          
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
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Flighty Branding */}
        <View style={styles.brandingSection}>
          <View style={styles.brandingRow}>
            <View style={styles.flightyIcon}>
              <MaterialIcons name="folder" size={24} color="#FCD34D" />
            </View>
            <Text style={styles.flightyText}>Flighty</Text>
            <Text style={styles.reportTitle}>All-Time Delay Report</Text>
          </View>
          <View style={styles.underline} />
        </View>

        {/* Main Delay Percentage */}
        <View style={styles.mainStatsSection}>
          <Text style={styles.delayPercentage}>0%</Text>
          <Text style={styles.delayMainText}>My flights delayed</Text>
          <Text style={styles.delaySubText}>0 of my 0 flights arrived later than scheduled</Text>
        </View>

        {/* Time Display Cards */}
        <View style={styles.timeCardsSection}>
          <View style={styles.timeCardsRow}>
            <View style={styles.timeCard}>
              <Text style={styles.timeCardText}>0</Text>
            </View>
            <View style={styles.timeCard}>
              <Text style={styles.timeCardText}>M</Text>
            </View>
            <View style={styles.timeCard}>
              <Text style={styles.timeCardText}>I</Text>
            </View>
            <View style={styles.timeCard}>
              <Text style={styles.timeCardText}>N</Text>
            </View>
            <View style={styles.timeCard}>
              <Text style={styles.timeCardText}></Text>
            </View>
          </View>
        </View>

        {/* Lost to Delays Section */}
        <View style={styles.lostToDelaysSection}>
          <Text style={styles.lostToDelaysTitle}>Lost to Delays</Text>
          <Text style={styles.lostToDelaysSubtitle}>Delayed flights averaged 0m late</Text>
        </View>

        {/* Worst Delay Section */}
        <View style={styles.worstDelaySection}>
          <Text style={styles.worstDelayTitle}>Worst Delay</Text>
          <View style={styles.worstDelayCard}>
            <Text style={styles.worstDelayText}>NONE</Text>
          </View>
        </View>

        {/* My Performance Section */}
        <View style={styles.performanceSection}>
          <View style={styles.performanceHeader}>
            <Text style={styles.performanceSectionTitle}>My Performance</Text>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.performanceMainStat}>
            <Text style={styles.performanceMainNumber}>0m</Text>
            <Text style={styles.performanceMainLabel}>late</Text>
            <Text style={styles.performanceSubtext}>cumulative arrival performance</Text>
          </View>

          <View style={styles.performanceBreakdown}>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Early</Text>
              <View style={styles.performanceBar}>
                <View style={[styles.performanceBarFill, { width: '0%' }]} />
              </View>
              <Text style={styles.performancePercentage}>0%</Text>
            </View>
            
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>On Time</Text>
              <View style={styles.performanceBar}>
                <View style={[styles.performanceBarFill, { width: '0%' }]} />
              </View>
              <Text style={styles.performancePercentage}>0%</Text>
            </View>
            
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>15m Late</Text>
              <View style={styles.performanceBar}>
                <View style={[styles.performanceBarFill, { width: '0%' }]} />
              </View>
              <Text style={styles.performancePercentage}>0%</Text>
            </View>
            
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>30m Late</Text>
              <View style={styles.performanceBar}>
                <View style={[styles.performanceBarFill, { width: '0%' }]} />
              </View>
              <Text style={styles.performancePercentage}>0%</Text>
            </View>
            
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>45m+ Late</Text>
              <View style={styles.performanceBar}>
                <View style={[styles.performanceBarFill, { width: '0%' }]} />
              </View>
              <Text style={styles.performancePercentage}>0%</Text>
            </View>
            
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Canceled</Text>
              <View style={styles.performanceBar}>
                <View style={[styles.performanceBarFill, { width: '0%' }]} />
              </View>
              <Text style={styles.performancePercentage}>0%</Text>
            </View>
            
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Diverted</Text>
              <View style={styles.performanceBar}>
                <View style={[styles.performanceBarFill, { width: '0%' }]} />
              </View>
              <Text style={styles.performancePercentage}>0%</Text>
            </View>
          </View>
        </View>

        {/* Airline Performance Section */}
        <View style={styles.performanceSection}>
          <View style={styles.performanceHeader}>
            <Text style={styles.performanceSectionTitle}>Airline Performance</Text>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.performanceMainStat}>
            <Text style={styles.performanceMainNumber}>0%</Text>
            <Text style={styles.performanceMainLabel}>late arrivals</Text>
          </View>
        </View>

        {/* Airport Performance Section */}
        <View style={styles.performanceSection}>
          <View style={styles.performanceHeader}>
            <Text style={styles.performanceSectionTitle}>Airport Performance</Text>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.performanceMainStat}>
            <Text style={styles.performanceMainNumber}>0%</Text>
            <Text style={styles.performanceMainLabel}>late departures</Text>
          </View>
        </View>

        {/* Arrival Delays Section */}
        <View style={styles.performanceSection}>
          <View style={styles.performanceHeader}>
            <Text style={styles.performanceSectionTitle}>Arrival Delays</Text>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F1D1D', // Dark red background
  },
  stickyHeader: {
    backgroundColor: '#7F1D1D',
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
    marginBottom: 10,
  },
  allTimeBadge: {
    backgroundColor: 'rgba(0,0,0,0.3)',
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
  scrollView: {
    flex: 1,
    backgroundColor: '#7F1D1D',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  // Branding Section
  brandingSection: {
    marginBottom: 30,
  },
  brandingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flightyIcon: {
    marginRight: 10,
  },
  flightyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 20,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCD34D', // Yellow color
    flex: 1,
  },
  underline: {
    height: 2,
    backgroundColor: '#FCD34D',
    marginTop: 5,
  },
  // Main Stats Section
  mainStatsSection: {
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  delayPercentage: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 80,
    marginBottom: 5,
  },
  delayMainText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    marginBottom: 5,
  },
  delaySubText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  // Time Cards Section
  timeCardsSection: {
    marginBottom: 30,
  },
  timeCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  timeCard: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    width: 50,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeCardText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  // Lost to Delays Section
  lostToDelaysSection: {
    marginBottom: 30,
  },
  lostToDelaysTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  lostToDelaysSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  // Worst Delay Section
  worstDelaySection: {
    marginBottom: 30,
  },
  worstDelayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  worstDelayCard: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  worstDelayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 2,
  },
  // Performance Sections
  performanceSection: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  performanceSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  // eslint-disable-next-line no-dupe-keys
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 5,
  },
  performanceMainStat: {
    marginBottom: 25,
  },
  performanceMainNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 64,
  },
  performanceMainLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  performanceSubtext: {
    fontSize: 14,
    color: '#999',
  },
  performanceBreakdown: {
    marginTop: 10,
  },
  performanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  performanceLabel: {
    fontSize: 16,
    color: '#000',
    width: 80,
    fontWeight: '500',
  },
  performanceBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginHorizontal: 15,
    overflow: 'hidden',
  },
  performanceBarFill: {
    height: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  performancePercentage: {
    fontSize: 16,
    color: '#666',
    width: 35,
    textAlign: 'right',
    fontWeight: '500',
  },
});