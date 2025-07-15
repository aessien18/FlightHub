import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useMemo, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ProfileScreen() {
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
    const router = useRouter();

    const navigateToFlightStats = () => {
        router.push('./AllFlightStat');
    };

    const navigateToDelayStats = () => {
        router.push('./AllDelayStat');
    };

    const navigateToAircraftStats = () => {
        router.push('./AircraftStat'); // Adjust path if needed
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            {/* Interactive Map replacing the static image */}
            <MapView
                provider={PROVIDER_GOOGLE}
                mapType="hybrid"
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
            
            <BottomSheet
                ref={sheetRef}
                index={1} // Start at 90% height
                snapPoints={snapPoints}
                enablePanDownToClose={false}
                style={styles.bottomSheet}
                handleIndicatorStyle={styles.handleIndicator}
            >
                {/* FIXED HEADER */}
                <View style={styles.fixedHeader}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}> 
                        <Text style={styles.backText}>← Back</Text> 
                    </TouchableOpacity> 

                    <View style={styles.profileSection}> 
                        <Text style={styles.name}>Add Your Name</Text> 
                        <Text style={styles.subtitle}>My Flight Log</Text> 
                    </View> 

                    <View style={styles.row}> 
                        <TouchableOpacity style={styles.button}>
                            <View style={styles.buttonContent}>
                                <MaterialIcons 
                                    name="group" 
                                    size={18} 
                                    color="#333" 
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.buttonText}>AirWise Friends</Text>
                            </View>
                        </TouchableOpacity> 
                        <TouchableOpacity style={styles.button}>
                            <View style={styles.buttonContent}>
                                <Ionicons 
                                    name="settings-outline" 
                                    size={18} 
                                    color="#333" 
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.buttonText}>Settings</Text>
                            </View>
                        </TouchableOpacity> 
                    </View> 

                    <Text style={styles.allTime}>ALL-TIME</Text> 
                </View>

                {/* SCROLLABLE CONTENT */}
                <BottomSheetScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={true}
                >
                    {/* PASSPORT CARD - Now Touchable */}
                    <TouchableOpacity 
                        style={styles.passportCard} 
                        onPress={navigateToFlightStats}
                        activeOpacity={0.8}
                    > 
                        <View style={styles.passportHeader}>
                            <View>
                                <Text style={styles.passportTitle}>ALL-TIME AIRWISE PASSPORT</Text>
                                <Text style={styles.passportSubtitle}>🛂 PASSPORT • PASS • PASAPORTE</Text>
                            </View>
                            <TouchableOpacity style={styles.shareButton}>
                                <Ionicons 
                                    name="share-outline" 
                                    size={16} 
                                    color="white" 
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.statsGrid}>
                            <View style={styles.statRow}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>FLIGHTS</Text>
                                    <Text style={styles.statValue}>0</Text>
                                    <Text style={styles.statSubtext}>0 Long Haul</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>DISTANCE</Text>
                                    <Text style={styles.statValue}>0 mi</Text>
                                    <Text style={styles.statSubtext}>0.0x around the world</Text>
                                </View>
                            </View>
                            <View style={styles.statRow}>
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

                        <TouchableOpacity 
                            style={styles.allStatsButton}
                            onPress={navigateToFlightStats}
                        >
                            <Text style={styles.allStatsText}>All Flight Stats</Text>
                            <Text style={styles.arrow}>{'>'}</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    {/* DELAY CARD - Now Touchable */}
                    <TouchableOpacity 
                        style={styles.delayCard}
                        onPress={navigateToDelayStats}
                        activeOpacity={0.8}
                    >
                        <View style={styles.delayHeader}>
                            <TouchableOpacity style={styles.delayShareButton}>
                                <Ionicons 
                                    name="share-outline" 
                                    size={16} 
                                    color="white" 
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.delayContent}>
                            <Text style={styles.delayNumber}>0</Text>
                            <Text style={styles.delayTitle}>minutes lost from delays</Text>
                            <Text style={styles.delaySubtitle}>Delayed flights averaged 0m late</Text>
                        </View>

                        <TouchableOpacity 
                            style={styles.allDelayStatsButton}
                            onPress={navigateToDelayStats}
                        >
                            <Text style={styles.allDelayStatsText}>All Delay Stats</Text>
                            <Text style={styles.delayArrow}>{'>'}</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    {/* MOST FLOWN AIRCRAFT CARD - Now Touchable */}
                    <TouchableOpacity
                        style={styles.aircraftCard}
                        onPress={navigateToAircraftStats}
                        activeOpacity={0.8}
                    >
                        <View style={styles.aircraftHeader}>
                            <Text style={styles.aircraftTitle}>Most flown aircraft</Text>
                            <TouchableOpacity style={styles.aircraftShareButton}>
                                <Ionicons 
                                    name="share-outline" 
                                    size={16} 
                                    color="#1e40af" 
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.aircraftContent}>
                            <Text style={styles.aircraftName}>Papercraft 747</Text>
                            <Text style={styles.aircraftSubtitle}>No flights with a real plane yet.</Text>
                        </View>

                        <View style={styles.aircraftBackground}>
                            <FontAwesome 
                                name="plane" 
                                size={80} 
                                color="#1e40af" 
                                style={{ opacity: 0.1 }}
                            />
                        </View>

                        <TouchableOpacity 
                            style={styles.allAircraftStatsButton}
                            onPress={(e) => {
                                e.stopPropagation();
                                navigateToAircraftStats();
                            }}
                        >
                            <Text style={styles.allAircraftStatsText}>All Aircraft Stats</Text>
                            <Text style={styles.aircraftArrow}>{'>'}</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    {/* PRO UPGRADE CARD */}
                    <View style={styles.proCard}>
                        <View style={styles.proContent}>
                            <View style={styles.proLeft}>
                                <Text style={styles.proBadge}>PRO</Text>
                                <Text style={styles.proTitle}>Complete Your Map & Stats</Text>
                                <Text style={styles.proSubtitle}>Upgrade to add flights older than 12 months.</Text>
                            </View>
                            <Text style={styles.proArrow}>{'>'}</Text>
                        </View>
                    </View>

                    {/* PAST FLIGHTS SECTION */}
                    <View style={styles.pastFlightsSection}>
                        <Text style={styles.pastFlightsTitle}>Past Flights</Text>
                        
                        <View style={styles.flightTableHeader}>
                            <Text style={styles.tableHeaderText}>DATE ↓</Text>
                            <Text style={styles.tableHeaderText}>FROM</Text>
                            <Text style={styles.tableHeaderText}>TO</Text>
                            <Text style={styles.tableHeaderText}>AIRLINE</Text>
                            <Text style={styles.tableHeaderText}>FLIGHT #</Text>
                        </View>
                        
                        <View style={styles.emptyFlights}>
                            <Text style={styles.emptyFlightsText}>No flights recorded yet</Text>
                        </View>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({ 
    container: { flex: 1 }, 
    map: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0 
    },
    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    handleIndicator: {
        backgroundColor: '#ccc',
        width: 40,
        height: 4,
    },
    // FIXED HEADER
    fixedHeader: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 10,
        zIndex: 1000,
    },
    // SCROLL VIEW
    scrollView: {
        backgroundColor: 'white',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 100,
    },
    backButton: { marginBottom: 8 }, 
    backText: { color: 'blue', fontSize: 16 }, 
    profileSection: { marginBottom: 12 }, 
    name: { fontSize: 22, fontWeight: '600' }, 
    subtitle: { color: '#555' }, 
    row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 }, 
    button: { 
        padding: 12, 
        backgroundColor: '#f0f0f0', 
        borderRadius: 12, 
        width: '48%', 
        alignItems: 'center', 
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 6,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    allTime: { 
        fontWeight: 'bold', 
        marginTop: 8,
        marginBottom: 0,
        fontSize: 14,
        color: '#666',
    }, 
    passportCard: { 
        backgroundColor: '#2D0F5E', 
        borderRadius: 15, 
        padding: 20,
        marginBottom: 20,
        shadowColor: "#1a0a3a",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(100, 149, 237, 0.3)',
    },
    passportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    shareButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    passportTitle: { 
        fontSize: 16, 
        color: 'white', 
        fontWeight: 'bold', 
    },
    passportSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 2,
    },
    statsGrid: {
        marginBottom: 15,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    statItem: {
        flex: 1,
        marginRight: 10,
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
        marginBottom: 2,
    },
    statValue: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    statSubtext: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
    },
    allStatsButton: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    allStatsText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    arrow: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // DELAY CARD STYLES
    delayCard: {
        backgroundColor: '#B91C1C',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#7f1d1d",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(220, 38, 38, 0.3)',
    },
    delayHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    delayShareButton: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 15,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    delayContent: {
        marginBottom: 15,
    },
    delayNumber: {
        fontSize: 56,
        color: 'white',
        fontWeight: 'bold',
        lineHeight: 60,
        marginBottom: 3,
    },
    delayTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        marginBottom: 3,
    },
    delaySubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
    },
    allDelayStatsButton: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    allDelayStatsText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    delayArrow: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // AIRCRAFT CARD STYLES
    aircraftCard: {
        backgroundColor: '#E0E7FF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    aircraftHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    aircraftTitle: {
        fontSize: 16,
        color: '#1e40af',
        fontWeight: '600',
    },
    aircraftShareButton: {
        backgroundColor: 'rgba(30, 64, 175, 0.2)',
        borderRadius: 15,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    aircraftContent: {
        marginBottom: 20,
        zIndex: 2,
    },
    aircraftName: {
        fontSize: 28,
        color: '#1e40af',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    aircraftSubtitle: {
        fontSize: 14,
        color: '#64748b',
    },
    aircraftBackground: {
        position: 'absolute',
        right: -10,
        bottom: 20,
        zIndex: 1,
    },
    allAircraftStatsButton: {
        backgroundColor: 'rgba(30, 64, 175, 0.2)',
        borderRadius: 10,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
    },
    allAircraftStatsText: {
        color: '#1e40af',
        fontSize: 16,
        fontWeight: '500',
    },
    aircraftArrow: {
        color: '#1e40af',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // PRO CARD STYLES
    proCard: {
        backgroundColor: '#F3E8FF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#a855f7",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    proContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    proLeft: {
        flex: 1,
    },
    proBadge: {
        fontSize: 12,
        color: '#a855f7',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    proTitle: {
        fontSize: 16,
        color: '#7c3aed',
        fontWeight: '600',
        marginBottom: 5,
    },
    proSubtitle: {
        fontSize: 14,
        color: '#64748b',
    },
    proArrow: {
        color: '#a855f7',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // PAST FLIGHTS STYLES
    pastFlightsSection: {
        marginBottom: 30,
    },
    pastFlightsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 15,
    },
    flightTableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        marginBottom: 10,
    },
    tableHeaderText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6b7280',
        flex: 1,
        textAlign: 'center',
    },
    emptyFlights: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    emptyFlightsText: {
        fontSize: 14,
        color: '#9ca3af',
        fontStyle: 'italic',
    },
    passportText: { 
        color: 'white', 
        marginBottom: 5,
        fontSize: 14,
    },
});
