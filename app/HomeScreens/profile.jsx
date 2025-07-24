import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import {
    Alert,
    Modal,
    Platform,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Import necessary libraries for screenshot and saving
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';

export default function ProfileScreen() {
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
    const router = useRouter();

    // Refs for each shareable card
    const passportCardRef = useRef(null);
    const delayCardRef = useRef(null);
    const aircraftCardRef = useRef(null);

    // State for controlling the custom share menu visibility
    const [isShareMenuVisible, setIsShareMenuVisible] = useState(false);
    // State to track which card is currently selected for sharing
    const [selectedCardType, setSelectedCardType] = useState(null);

    // New state for FlightHub Friends modal visibility
    const [isFriendsModalVisible, setIsFriendsModalVisible] = useState(false);

    const navigateToFlightStats = () => {
        router.push('./AllFlightStat');
    };

    const navigateToDelayStats = () => {
        router.push('./AllDelayStat');
    };

    const navigateToAircraftStats = () => {
        router.push('./AircraftStat');
    };

    // Helper function to get the correct ref based on card type
    const getCardRef = (type) => {
        switch (type) {
            case 'passport':
                return passportCardRef;
            case 'delay':
                return delayCardRef;
            case 'aircraft':
                return aircraftCardRef;
            default:
                return null;
        }
    };

    // Helper function to get the appropriate share message based on card type
    const getCardMessage = (type) => {
        const flights = 0; // These will be dynamic later
        const airports = 0;
        const airlines = 0;
        const minutesLost = 0; // Example for delay stats
        const mostFlownAircraft = "Papercraft 747"; // Example for aircraft stats

        switch (type) {
            case 'passport':
                return `My Flight Stats by FlightHub: ${flights} flights, ${airports} airports, ${airlines} airlines. Check out my FlightHub Passport!`;
            case 'delay':
                return `I've lost ${minutesLost} minutes from flight delays! See my delay stats on FlightHub.`;
            case 'aircraft':
                return `My most flown aircraft is the ${mostFlownAircraft}! Check out my aircraft stats on FlightHub.`;
            default:
                return 'Check out my stats on FlightHub!';
        }
    };

    // Generic function to handle sharing any card (image + text)
    const onShareCard = async () => {
        if (!selectedCardType) return;

        const cardRef = getCardRef(selectedCardType);
        const textMessage = getCardMessage(selectedCardType);

        try {
            if (!cardRef || !cardRef.current) {
                throw new Error(`Ref not found for card type: ${selectedCardType}`);
            }

            const imageUri = await cardRef.current.capture();
            console.log(`Image captured for sharing (${selectedCardType}):`, imageUri);

            const shareOptions = {
                message: textMessage,
                url: imageUri,
            };

            const result = await Share.share(shareOptions);

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared with activity type:', result.activityType);
                } else {
                    console.log('Shared successfully');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            Alert.alert('Error', `Failed to share ${selectedCardType} card: ` + error.message);
            console.error(`Error sharing ${selectedCardType} card:`, error);
        } finally {
            closeShareMenu();
        }
    };

    const onSaveCardToGallery = async () => {
        if (!selectedCardType) return;

        const cardRef = getCardRef(selectedCardType);

        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Please grant photo library access to save the card.');
                return;
            }

            if (!cardRef || !cardRef.current) {
                throw new Error(`Ref not found for card type: ${selectedCardType}`);
            }

            const uri = await cardRef.current.capture();
            console.log(`Screenshot captured for saving (${selectedCardType}):`, uri);

            await MediaLibrary.saveToLibraryAsync(uri);
            Alert.alert('Success', `FlightHub ${selectedCardType} card saved to your photos!`);
        } catch (error) {
            Alert.alert('Error', `Failed to save ${selectedCardType} card to photos: ` + error.message);
            console.error(`Error saving ${selectedCardType} card to gallery:`, error);
        } finally {
            closeShareMenu();
        }
    };

    // Functions to open/close the custom share menu
    const openShareMenu = (cardType) => {
        setSelectedCardType(cardType);
        setIsShareMenuVisible(true);
    };

    const closeShareMenu = () => {
        setIsShareMenuVisible(false);
        setSelectedCardType(null);
    };

    // Functions to open/close the FlightHub Friends modal
    const openFriendsModal = () => {
        setIsFriendsModalVisible(true);
    };

    const closeFriendsModal = () => {
        setIsFriendsModalVisible(false);
    };


    return (
        <GestureHandlerRootView style={styles.container}>
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
                index={1}
                snapPoints={snapPoints}
                enablePanDownToClose={false}
                style={styles.bottomSheet}
                handleIndicatorStyle={styles.handleIndicator}
            >
                <View style={styles.fixedHeader}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>

                    <View style={styles.profileSection}>
                        <Text style={styles.name}>Add Your Name</Text>
                        <Text style={styles.subtitle}>My Flight Log</Text>
                    </View>

                    <View style={styles.row}>
                        {/* FlightHub Friends button - now opens the new modal */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={openFriendsModal}
                        >
                            <View style={styles.buttonContent}>
                                <MaterialIcons
                                    name="group"
                                    size={18}
                                    color="white"
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.buttonText}>FlightHub Friends</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => router.push('../screens/settings')}
                        >
                            <View style={styles.buttonContent}>
                                <Ionicons
                                    name="settings-outline"
                                    size={18}
                                    color="white"
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.buttonText}>Settings</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.allTime}>ALL-TIME</Text>
                </View>

                <BottomSheetScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={true}
                >
                    {/* PASSPORT CARD - Wrapped with ViewShot and ref */}
                    <ViewShot
                        ref={passportCardRef}
                        options={{ format: 'png', quality: 1.0 }}
                    >
                        <TouchableOpacity
                            style={styles.passportCard}
                            onPress={navigateToFlightStats}
                            activeOpacity={0.8}
                        >
                            <View style={styles.passportHeader}>
                                <View>
                                    <Text style={styles.passportTitle}>ALL-TIME FLIGHTHUB PASSPORT</Text>
                                    <Text style={styles.passportSubtitle}>🛂 PASSPORT • PASS • PASAPORTE</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.shareButton}
                                    onPress={() => openShareMenu('passport')}
                                >
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
                    </ViewShot>

                    {/* DELAY CARD - Wrapped with ViewShot and ref */}
                    <ViewShot
                        ref={delayCardRef}
                        options={{ format: 'png', quality: 1.0 }}
                    >
                        <TouchableOpacity
                            style={styles.delayCard}
                            onPress={navigateToDelayStats}
                            activeOpacity={0.8}
                        >
                            <View style={styles.delayHeader}>
                                <TouchableOpacity
                                    style={styles.delayShareButton}
                                    onPress={() => openShareMenu('delay')}
                                >
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
                    </ViewShot>

                    {/* MOST FLOWN AIRCRAFT CARD - Wrapped with ViewShot and ref */}
                    <ViewShot
                        ref={aircraftCardRef}
                        options={{ format: 'png', quality: 1.0 }}
                    >
                        <TouchableOpacity
                            style={styles.aircraftCard}
                            onPress={navigateToAircraftStats}
                            activeOpacity={0.8}
                        >
                            <View style={styles.aircraftHeader}>
                                <Text style={styles.aircraftTitle}>Most flown aircraft</Text>
                                <TouchableOpacity
                                    style={styles.aircraftShareButton}
                                    onPress={() => openShareMenu('aircraft')}
                                >
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
                    </ViewShot>

                    {/* PRO UPGRADE CARD */}
                    <View style={styles.proCard}>
                        <TouchableOpacity style={styles.proContent}>
                            <View style={styles.proLeft}>
                                <Text style={styles.proBadge}>PRO</Text>
                                <Text style={styles.proTitle}>Complete Your Map & Stats</Text>
                                <Text style={styles.proSubtitle}>Upgrade to add flights older than 12 months.</Text>
                            </View>
                            <Text style={styles.proArrow}>{'>'}</Text>
                        </TouchableOpacity>
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

            {/* Custom Share Menu Modal (for Passport, Delay, Aircraft Cards) */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isShareMenuVisible}
                onRequestClose={closeShareMenu}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPressOut={closeShareMenu}
                >
                    <View style={styles.shareMenuContainer}>
                        <View style={styles.shareMenuHandle} />
                        <Text style={styles.shareMenuTitle}>Share {selectedCardType ? selectedCardType.charAt(0).toUpperCase() + selectedCardType.slice(1) : ''} Card</Text>

                        {/* Messages Option */}
                        <TouchableOpacity
                            style={styles.shareOptionButton}
                            onPress={onShareCard}
                        >
                            <Ionicons name="chatbubble-outline" size={24} color="#007AFF" />
                            <Text style={styles.shareOptionText}>Messages</Text>
                        </TouchableOpacity>

                        {/* Gallery Option */}
                        <TouchableOpacity
                            style={styles.shareOptionButton}
                            onPress={onSaveCardToGallery}
                        >
                            <Ionicons name="image-outline" size={24} color="#4CAF50" />
                            <Text style={styles.shareOptionText}>Gallery</Text>
                        </TouchableOpacity>

                        {/* More Options */}
                        <TouchableOpacity
                            style={styles.shareOptionButton}
                            onPress={onShareCard}
                        >
                            <Ionicons name="ellipsis-horizontal-circle-outline" size={24} color="#666" />
                            <Text style={styles.shareOptionText}>More Options</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.shareMenuCancelButton}
                            onPress={closeShareMenu}
                        >
                            <Text style={styles.shareMenuCancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* NEW: FlightHub Friends Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isFriendsModalVisible}
                onRequestClose={closeFriendsModal}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPressOut={closeFriendsModal}
                >
                    <View style={styles.friendsModalContainer}>
                        {/* Close Button */}
                        <TouchableOpacity
                            style={styles.friendsModalCloseButton}
                            onPress={closeFriendsModal}
                        >
                            <Ionicons name="close-circle" size={30} color="#666" />
                        </TouchableOpacity>

                        {/* Friend Avatars (mocked from flighthub Friends.jpg) */}
                        <View style={styles.friendAvatarsContainer}>
                            <View style={styles.friendAvatar}>
                                <Text style={styles.avatarEmoji}>👩🏾‍🦱</Text>
                                <Ionicons name="airplane" size={16} color="gray" style={styles.avatarPlane} />
                            </View>
                            <View style={styles.friendAvatar}>
                                <Text style={styles.avatarEmoji}>👨🏻‍🦰</Text>
                                <Ionicons name="airplane" size={16} color="gray" style={styles.avatarPlane} />
                            </View>
                            <View style={styles.friendAvatar}>
                                <Text style={styles.avatarEmoji}>👧🏽</Text>
                                <Ionicons name="airplane" size={16} color="gray" style={styles.avatarPlane} />
                            </View>
                        </View>

                        <Text style={styles.friendsModalTitle}>FlightHub Friends</Text>
                        <Text style={styles.friendsModalDescription}>
                            Add friends and family to share upcoming flights, get status updates, and see each other fly on the map.
                        </Text>
                        <Text style={styles.friendsModalSubDescription}>
                            It&apos;s free, and saves you from ever hearing &quot;Send me your flight info!&quot; again!
                        </Text>

                        {/* Add FlightHub Friend Button */}
                        <TouchableOpacity
                            style={styles.addFriendButton}
                            onPress={() => {
                                Alert.alert('Add Friend', 'This would open the "Add FlightHub Friend" screen.');
                                closeFriendsModal();
                            }}
                        >
                            <Ionicons name="person-add-outline" size={20} color="white" style={styles.addFriendIcon} />
                            <Text style={styles.addFriendButtonText}>Add FlightHub Friend</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
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
    fixedHeader: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
        zIndex: 1000,
    },
    scrollView: {
        backgroundColor: 'white',
    },
    scrollContent: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 100,
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 20,
        zIndex: 1001,
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    profileSection: {
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    name: { fontSize: 22, fontWeight: '600', color: '#333' },
    subtitle: { color: '#666' },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
    button: {
        padding: 12,
        backgroundColor: '#007AFF',
        borderRadius: 12,
        width: '48%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#007AFF',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
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
        color: 'white',
    },
    allTime: {
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 0,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
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
        marginBottom: 5,
    },
    aircraftTitle: {
        fontSize: 16,
        color: '#1e40af',
        fontWeight: 'bold',
    },
    aircraftShareButton: {
        backgroundColor: 'rgba(30,64,175,0.1)',
        borderRadius: 15,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    aircraftContent: {
        marginBottom: 15,
    },
    aircraftName: {
        fontSize: 24,
        color: '#1e40af',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    aircraftSubtitle: {
        fontSize: 13,
        color: '#4f46e5',
    },
    aircraftBackground: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        opacity: 0.1,
        transform: [{ rotate: '-20deg' }],
    },
    allAircraftStatsButton: {
        backgroundColor: 'rgba(30,64,175,0.1)',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    proCard: {
        backgroundColor: '#F0F0F0',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    proContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    proLeft: {
        flex: 1,
        marginRight: 10,
    },
    proBadge: {
        backgroundColor: '#FFD700',
        color: '#333',
        fontSize: 10,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    proTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    proSubtitle: {
        fontSize: 13,
        color: '#666',
    },
    proArrow: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    pastFlightsSection: {
        marginBottom: 20,
    },
    pastFlightsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    flightTableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginBottom: 10,
    },
    tableHeaderText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#999',
        flex: 1,
        textAlign: 'center',
    },
    emptyFlights: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    emptyFlightsText: {
        fontSize: 16,
        color: '#999',
    },
    // Custom Share Menu Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    shareMenuContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20, // Adjust for iOS safe area
        alignItems: 'center',
    },
    shareMenuHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        marginVertical: 10,
    },
    shareMenuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    shareOptionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    shareOptionText: {
        fontSize: 18,
        marginLeft: 15,
        color: '#333',
    },
    shareMenuCancelButton: {
        marginTop: 20,
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        alignItems: 'center',
    },
    shareMenuCancelButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    // FlightHub Friends Modal Styles
    friendsModalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        width: '100%',
    },
    friendsModalCloseButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        padding: 5,
    },
    friendAvatarsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    friendAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    avatarEmoji: {
        fontSize: 30,
        lineHeight: 35, // Adjust line height to center emoji
    },
    avatarPlane: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 2,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    friendsModalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    friendsModalDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 22,
    },
    friendsModalSubDescription: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginBottom: 30,
        fontStyle: 'italic',
    },
    addFriendButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    addFriendIcon: {
        marginRight: 10,
    },
    addFriendButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
